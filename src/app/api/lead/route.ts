import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO = "p.ellevernici@gmail.com";

type LeadBody = {
  nome: string;
  cellulare: string;
  modelloAuto: string;
  richiesta: string;
};

function isConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM,
  );
}

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON non valido" }, { status: 400 });
  }

  const nome = String(body.nome ?? "").trim();
  const cellulare = String(body.cellulare ?? "").trim();
  const modelloAuto = String(body.modelloAuto ?? "").trim();
  const richiesta = String(body.richiesta ?? "").trim();

  if (!nome || !cellulare || !richiesta) {
    return NextResponse.json(
      { ok: false, error: "Nome, cellulare e richiesta sono obbligatori." },
      { status: 400 },
    );
  }

  if (!isConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        mailtoFallback: true,
        message:
          "Invio server non configurato. Usa il fallback mailto dal client o imposta SMTP_* in .env.local.",
      },
      { status: 503 },
    );
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = `[P.ELLE Lead] ${nome} — ${modelloAuto || "modello non indicato"}`;
  const text = [
    `Nome: ${nome}`,
    `Cellulare: ${cellulare}`,
    `Modello auto: ${modelloAuto || "-"}`,
    "",
    "Richiesta:",
    richiesta,
  ].join("\n");

  const html = `
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Cellulare:</strong> ${escapeHtml(cellulare)}</p>
    <p><strong>Modello auto:</strong> ${escapeHtml(modelloAuto || "-")}</p>
    <p><strong>Richiesta:</strong></p>
    <p>${escapeHtml(richiesta).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: TO,
      replyTo: cellulare.includes("@") ? cellulare : undefined,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Errore invio email. Riprova o contatta direttamente." },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
