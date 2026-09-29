export type VetrinaProduct = {
  id: string;
  code: string;
  name: string;
  info: string;
  price: string;
  visible: boolean;
  images: string[];
};

export function vetrinaLabel(product: Pick<VetrinaProduct, "code" | "name">): string {
  const name = product.name.trim();
  if (name) return name;
  if (product.code.trim()) return `Articolo ${product.code.trim()}`;
  return "Articolo";
}

export function vetrinaWhatsappText(product: VetrinaProduct): string {
  const lines = [
    "Ciao P.ELLE Vernici e Ricambi,",
    `vorrei informazioni e disponibilità in sede per: ${vetrinaLabel(product)}${
      product.code.trim() ? ` (art. ${product.code.trim()})` : ""
    }.`,
  ];
  if (product.price.trim()) {
    lines.push(`Prezzo indicato in vetrina: ${product.price.trim()}.`);
  }
  lines.push(
    "Non acquisto dal sito: possiamo organizzare su WhatsApp oppure in negozio.",
    "Grazie.",
  );
  return lines.join("\n");
}

export function cleanText(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function cleanInfo(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, max);
}

export function cleanImageUrl(value: unknown): string | null {
  const url = String(value ?? "").trim();
  if (!url || url.length > 600) return null;
  if (url.startsWith("/vetrina/") || url.startsWith("/uploads/vetrina/")) {
    if (url.includes("..")) return null;
    return url;
  }
  if (url.startsWith("https://")) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "https:") return url;
    } catch {
      return null;
    }
  }
  return null;
}

export function normalizeProduct(raw: unknown): VetrinaProduct | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Partial<VetrinaProduct>;
  const id = cleanText(row.id, 80);
  if (!id || !/^[\w.-]+$/.test(id)) return null;
  const images = Array.isArray(row.images)
    ? row.images.map(cleanImageUrl).filter((src): src is string => Boolean(src)).slice(0, 8)
    : [];
  return {
    id,
    code: cleanText(row.code, 40),
    name: cleanText(row.name, 140),
    info: cleanInfo(row.info, 2000),
    price: cleanText(row.price, 40),
    visible: row.visible !== false,
    images,
  };
}
