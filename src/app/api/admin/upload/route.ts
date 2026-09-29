import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { storeUploadedImage } from "@/lib/vetrina-store";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;

function sniff(buf: Buffer): "image/jpeg" | "image/png" | "image/webp" | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return "image/png";
  }
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Scegli una foto." }, { status: 400 });
    }
    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "La foto deve pesare meno di 5 MB." }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const contentType = sniff(bytes);
    if (!contentType) {
      return NextResponse.json(
        { ok: false, error: "Formato non accettato. Usa JPG, PNG o WebP." },
        { status: 400 },
      );
    }
    const url = await storeUploadedImage(bytes, contentType);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Caricamento non riuscito.";
    const status = message.includes("Archivio") ? 503 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
