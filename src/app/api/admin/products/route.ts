import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { cleanInfo, cleanText, normalizeProduct } from "@/lib/vetrina-product";
import { listProducts, saveProduct, storageMode } from "@/lib/vetrina-store";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const products = await listProducts();
  return NextResponse.json({ ok: true, products, storage: storageMode() });
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const body = await req.json();
    const product = normalizeProduct({
      ...(typeof body === "object" && body ? body : {}),
      id: randomBytes(8).toString("hex"),
      visible: body?.visible !== false,
    });
    if (!product) {
      return NextResponse.json({ ok: false, error: "Dati articolo non validi." }, { status: 400 });
    }
    product.name = cleanText(product.name, 140);
    product.info = cleanInfo(product.info, 2000);
    const products = await saveProduct(product, true);
    return NextResponse.json({ ok: true, product, products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Salvataggio non riuscito.";
    const status = message.includes("Archivio") ? 503 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
