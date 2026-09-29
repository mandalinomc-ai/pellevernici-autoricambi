import { NextRequest, NextResponse } from "next/server";
import { adminConfigured, passwordsMatch, setAdminCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Pannello non attivato: manca ADMIN_PASSWORD sul server." },
      { status: 503 },
    );
  }
  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }
  if (!passwordsMatch(password)) {
    return NextResponse.json({ ok: false, error: "Password non corretta." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  setAdminCookie(res);
  return res;
}
