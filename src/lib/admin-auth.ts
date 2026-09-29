import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "pelle_admin";
const MAX_AGE = 60 * 60 * 24 * 14;

function password(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function adminConfigured(): boolean {
  return password().length >= 8;
}

function sign(exp: number): string {
  const payload = String(exp);
  const sig = createHmac("sha256", password()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function isAdminRequest(req: NextRequest): boolean {
  if (!adminConfigured()) return false;
  const token = req.cookies.get(COOKIE)?.value;
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = createHmac("sha256", password()).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function passwordsMatch(input: string): boolean {
  const expected = password();
  const given = Buffer.from(input);
  const want = Buffer.from(expected);
  if (!expected || given.length !== want.length) return false;
  return timingSafeEqual(given, want);
}

export function setAdminCookie(res: NextResponse) {
  const exp = Date.now() + MAX_AGE * 1000;
  res.cookies.set(COOKIE, sign(exp), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearAdminCookie(res: NextResponse) {
  res.cookies.set(COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function requireAdmin(req: NextRequest): NextResponse | null {
  if (!adminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Pannello non attivato: manca ADMIN_PASSWORD sul server." },
      { status: 503 },
    );
  }
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "Accesso richiesto." }, { status: 401 });
  }
  const origin = req.headers.get("origin");
  if (origin) {
    const host = req.headers.get("host");
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ ok: false, error: "Origine non valida." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, error: "Origine non valida." }, { status: 403 });
    }
  }
  return null;
}
