"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { whatsappHref } from "@/lib/whatsapp";

const INTRO = `Ciao P.ELLE Vernici e Ricambi,

Richiesta di adesione al programma *P.ELLE Priority* (fedeltà partner).

Di seguito i miei dati e quelli dell'attività. Vi chiedo di valutare insieme il percorso e attivare il profilo dedicato.

`;

type FormState = {
  nomeCognome: string;
  ragioneSociale: string;
  partitaIva: string;
  indirizzoAttivita: string;
  telefono: string;
  email: string;
  note: string;
};

const empty: FormState = {
  nomeCognome: "",
  ragioneSociale: "",
  partitaIva: "",
  indirizzoAttivita: "",
  telefono: "",
  email: "",
  note: "",
};

function buildMessage(f: FormState): string {
  const lines = [
    INTRO,
    "— Dati del richiedente —",
    `Nome e cognome: ${f.nomeCognome.trim()}`,
    `Attività / Ragione sociale: ${f.ragioneSociale.trim()}`,
    f.partitaIva.trim() ? `Partita IVA: ${f.partitaIva.trim()}` : "Partita IVA: (non indicata)",
    f.indirizzoAttivita.trim()
      ? `Sede / indirizzo attività: ${f.indirizzoAttivita.trim()}`
      : "Sede / indirizzo attività: (non indicato)",
    `Telefono: ${f.telefono.trim()}`,
    f.email.trim() ? `Email: ${f.email.trim()}` : "Email: (non indicata)",
    "",
    f.note.trim() ? `Note:\n${f.note.trim()}` : "",
    "",
    "Grazie.",
  ];
  return lines.filter(Boolean).join("\n");
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function FedeltaWhatsappModal({ open, onClose }: Props) {
  const titleId = useId();
  const [form, setForm] = useState<FormState>(empty);
  const [privacyOk, setPrivacyOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setForm(empty);
      setPrivacyOk(false);
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const submit = () => {
    if (!form.nomeCognome.trim() || !form.ragioneSociale.trim() || !form.telefono.trim()) {
      setError("Compila nome e cognome, attività e telefono.");
      return;
    }
    if (!privacyOk) {
      setError("Per proseguire devi confermare di aver preso visione dell’informativa privacy.");
      return;
    }
    setError(null);
    const href = whatsappHref(buildMessage(form));
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] max-h-[min(92vh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/15 bg-[#161b22] p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold text-white sm:text-xl">
            Aderisci a P.ELLE Priority
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/10 px-2 py-1 text-sm text-zinc-400 transition hover:border-white/25 hover:text-white"
            aria-label="Chiudi"
          >
            ✕
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Compila i campi: apriremo WhatsApp sul tuo dispositivo con un messaggio già pronto che
          include i dati inseriti. Il messaggio parte dal tuo account: puoi modificarlo prima
          dell’invio.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">Nome e cognome *</span>
            <input
              required
              autoComplete="name"
              value={form.nomeCognome}
              onChange={(e) => setForm((s) => ({ ...s, nomeCognome: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
              placeholder="Mario Rossi"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">Attività / Ragione sociale *</span>
            <input
              required
              autoComplete="organization"
              value={form.ragioneSociale}
              onChange={(e) => setForm((s) => ({ ...s, ragioneSociale: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
              placeholder="Carrozzeria … / P.IVA o nome ditta"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">Partita IVA</span>
            <input
              autoComplete="off"
              value={form.partitaIva}
              onChange={(e) => setForm((s) => ({ ...s, partitaIva: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
              placeholder="Facoltativa"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">Sede / indirizzo attività</span>
            <input
              autoComplete="street-address"
              value={form.indirizzoAttivita}
              onChange={(e) => setForm((s) => ({ ...s, indirizzoAttivita: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
              placeholder="Via, CAP, città"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">Telefono *</span>
            <input
              required
              type="tel"
              autoComplete="tel"
              value={form.telefono}
              onChange={(e) => setForm((s) => ({ ...s, telefono: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
              placeholder="+39 …"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">Email</span>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
              placeholder="Facoltativa ma consigliata"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-200">Note per P.ELLE</span>
            <textarea
              rows={3}
              value={form.note}
              onChange={(e) => setForm((s) => ({ ...s, note: e.target.value }))}
              className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
              placeholder="Es. tipologia di lavorazioni, volumi, urgenze…"
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-400">
            <input
              type="checkbox"
              checked={privacyOk}
              onChange={(e) => setPrivacyOk(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 accent-[#d32f2f]"
            />
            <span>
              Dichiaro di aver preso visione dell’{" "}
              <Link
                href="/privacy-policy"
                className="text-[#93c5fd] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                informativa sulla privacy
              </Link>{" "}
              e               di inviare i dati tramite WhatsApp a P.ELLE Vernici e Ricambi ai fini della richiesta
              di adesione al programma P.ELLE Priority. *
            </span>
          </label>

          {error ? <p className="text-sm text-[#fca5a5]">{error}</p> : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#042d11] shadow-[0_0_24px_rgba(37,211,102,0.35)] transition hover:bg-[#34eb7a]"
            >
              <WhatsAppGlyph className="h-5 w-5 shrink-0" />
              Invia richiesta su WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FedeltaSubscribeCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-[#d32f2f] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(211,47,47,0.4)] transition hover:bg-[#ef5350] sm:w-auto"
      >
        Aderisci ora a P.ELLE Priority
      </button>
      <FedeltaWhatsappModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
