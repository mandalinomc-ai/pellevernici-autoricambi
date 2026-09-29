import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { normalizeProduct } from "@/lib/vetrina-product";
import { removeProduct, saveProduct } from "@/lib/vetrina-store";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const product = normalizeProduct({ ...(typeof body === "object" && body ? body : {}), id });
    if (!product) {
      return NextResponse.json({ ok: false, error: "Dati articolo non validi." }, { status: 400 });
    }
    const products = await saveProduct(product, false);
    return NextResponse.json({ ok: true, product, products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Salvataggio non riuscito.";
    const status = message.includes("non trovato") ? 404 : message.includes("Archivio") ? 503 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const products = await removeProduct(id);
    return NextResponse.json({ ok: true, products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eliminazione non riuscita.";
    const status = message.includes("non trovato") ? 404 : message.includes("Archivio") ? 503 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
