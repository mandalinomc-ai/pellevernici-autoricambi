import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import seedCatalog from "@/config/vetrina-catalog.json";
import { cleanImageUrl, normalizeProduct, type VetrinaProduct } from "@/lib/vetrina-product";

const CATALOG_PATH = "vetrina/catalog.json";
const DATA_FILE = path.join(process.cwd(), "data", "vetrina-live.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "vetrina");

export type StorageMode = "blob" | "file" | "readonly";

type SeedRow = { id: string; code: string; images: string[] };

export function storageMode(): StorageMode {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return "blob";
  if (process.env.VERCEL) return "readonly";
  return "file";
}

function seedProducts(): VetrinaProduct[] {
  return (seedCatalog as SeedRow[]).map((row) => ({
    id: row.id,
    code: row.code,
    name: "",
    info: "",
    price: "",
    visible: true,
    images: row.images.map(cleanImageUrl).filter((src): src is string => Boolean(src)),
  }));
}

function sortProducts(products: VetrinaProduct[]): VetrinaProduct[] {
  return [...products].sort((a, b) =>
    a.code.localeCompare(b.code, "it", { numeric: true, sensitivity: "base" }),
  );
}

async function readBlobCatalog(): Promise<VetrinaProduct[] | null> {
  const { get } = await import("@vercel/blob");
  const result = await get(CATALOG_PATH, { access: "public", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  const text = await new Response(result.stream).text();
  const parsed = JSON.parse(text) as { products?: unknown };
  if (!Array.isArray(parsed.products)) return null;
  return parsed.products
    .map(normalizeProduct)
    .filter((row): row is VetrinaProduct => row !== null);
}

async function writeBlobCatalog(products: VetrinaProduct[]) {
  const { put } = await import("@vercel/blob");
  await put(CATALOG_PATH, JSON.stringify({ products }), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

async function readFileCatalog(): Promise<VetrinaProduct[] | null> {
  try {
    const text = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(text) as { products?: unknown };
    if (!Array.isArray(parsed.products)) return null;
    return parsed.products
      .map(normalizeProduct)
      .filter((row): row is VetrinaProduct => row !== null);
  } catch {
    return null;
  }
}

async function writeFileCatalog(products: VetrinaProduct[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify({ products }, null, 2), "utf8");
}

export async function listProducts(): Promise<VetrinaProduct[]> {
  const mode = storageMode();
  try {
    if (mode === "blob") {
      const live = await readBlobCatalog();
      return sortProducts(live ?? seedProducts());
    }
    if (mode === "file") {
      const live = await readFileCatalog();
      return sortProducts(live ?? seedProducts());
    }
  } catch (error) {
    console.error("Lettura catalogo vetrina non riuscita", error);
  }
  return sortProducts(seedProducts());
}

export async function listPublicProducts(): Promise<VetrinaProduct[]> {
  const all = await listProducts();
  return all.filter((product) => product.visible);
}

async function persist(products: VetrinaProduct[]) {
  const mode = storageMode();
  if (mode === "readonly") {
    throw new Error(
      "Archivio non collegato. Su Vercel serve un Blob store (BLOB_READ_WRITE_TOKEN) per salvare le modifiche.",
    );
  }
  const sorted = sortProducts(products);
  if (mode === "blob") await writeBlobCatalog(sorted);
  else await writeFileCatalog(sorted);
  return sorted;
}

export async function saveProduct(input: VetrinaProduct, isNew: boolean): Promise<VetrinaProduct[]> {
  const products = await listProducts();
  const code = input.code.trim().toLowerCase();
  if (code) {
    const clash = products.find((item) => item.id !== input.id && item.code.trim().toLowerCase() === code);
    if (clash) throw new Error(`Il codice ${input.code} è già usato da un altro articolo.`);
  }
  if (!input.name.trim() && !input.code.trim()) {
    throw new Error("Scrivi almeno un nome o un codice articolo.");
  }
  if (isNew && products.some((item) => item.id === input.id)) {
    throw new Error("Questo articolo esiste già.");
  }
  const next = isNew
    ? [input, ...products.filter((item) => item.id !== input.id)]
    : products.map((item) => (item.id === input.id ? input : item));
  if (!isNew && !products.some((item) => item.id === input.id)) {
    throw new Error("Articolo non trovato.");
  }
  const previous = products.find((item) => item.id === input.id);
  const saved = await persist(next);
  if (previous) {
    const removed = previous.images.filter((src) => !input.images.includes(src));
    await deleteManagedImages(removed);
  }
  return saved;
}

export async function removeProduct(id: string): Promise<VetrinaProduct[]> {
  const products = await listProducts();
  const current = products.find((item) => item.id === id);
  if (!current) throw new Error("Articolo non trovato.");
  const saved = await persist(products.filter((item) => item.id !== id));
  await deleteManagedImages(current.images);
  return saved;
}

export async function storeUploadedImage(bytes: Buffer, contentType: "image/jpeg" | "image/png" | "image/webp") {
  const ext = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const mode = storageMode();
  if (mode === "readonly") {
    throw new Error("Archivio non collegato: non posso salvare le foto.");
  }
  if (mode === "blob") {
    const { put } = await import("@vercel/blob");
    const blob = await put(`vetrina/uploads/${name}`, bytes, {
      access: "public",
      addRandomSuffix: false,
      contentType,
      cacheControlMaxAge: 60 * 60 * 24 * 30,
    });
    return blob.url;
  }
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  return `/uploads/vetrina/${name}`;
}

function isManagedUpload(url: string): boolean {
  return url.startsWith("/uploads/vetrina/") || url.includes("blob.vercel-storage.com");
}

async function deleteManagedImages(urls: string[]) {
  for (const url of urls) {
    if (!isManagedUpload(url)) continue;
    try {
      if (url.startsWith("/uploads/vetrina/")) {
        const base = path.basename(url);
        if (!/^[\w.-]+$/.test(base)) continue;
        await fs.unlink(path.join(UPLOAD_DIR, base));
      } else if (storageMode() === "blob") {
        const { del } = await import("@vercel/blob");
        await del(url);
      }
    } catch (error) {
      console.error("Rimozione foto non riuscita", url, error);
    }
  }
}
