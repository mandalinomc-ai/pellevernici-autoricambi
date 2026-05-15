"use client";

import { useEffect, useMemo, useState } from "react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { isBusinessOpen, businessHoursLabel } from "@/lib/business-hours";

function formatNowRome(d: Date): string {
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const online = useMemo(() => isBusinessOpen(now), [now]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] left-[max(1.25rem,env(safe-area-inset-left,0px))] z-[60] flex h-14 w-14 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-[#161b22]/95 text-xl text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur transition active:scale-95 hover:border-[#1565c0]/50 sm:bottom-8 sm:left-8 sm:h-16 sm:w-16"
        aria-expanded={open}
        aria-controls="pelle-chat-panel"
        aria-label="Apri assistente P.ELLE"
      >
        <span aria-hidden>✦</span>
      </button>

      {open && (
        <div
          id="pelle-chat-panel"
          className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] left-[max(1rem,env(safe-area-inset-left,0px))] z-[59] w-[min(100vw-2rem,380px)] overflow-hidden rounded-2xl border border-white/10 bg-[#161b22]/98 shadow-2xl shadow-black/60 backdrop-blur-xl sm:left-8"
        >
          <div className="border-b border-white/10 bg-gradient-to-r from-[#d32f2f]/20 to-[#1565c0]/20 px-4 py-3">
            <p className="text-sm font-semibold text-white">Assistente P.ELLE</p>
            <p className="text-xs text-zinc-400">
              Ora Italia: {formatNowRome(now)} · {businessHoursLabel()}
            </p>
          </div>
          <div className="max-h-[min(70vh,520px)] overflow-y-auto p-4">
            {online ? <OnlinePanel /> : <OfflinePanel />}
          </div>
        </div>
      )}
    </>
  );
}

function OnlinePanel() {
  return (
    <div className="space-y-4 text-sm text-zinc-300">
      <p>
        Ciao! Sono l&apos;assistente di P.ELLE. Hai bisogno di un ricambio o un preventivo colore?
        Siamo operativi!
      </p>
      <a
        href="https://wa.me/393471841667"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white"
      >
        <WhatsAppGlyph className="h-5 w-5 shrink-0" />
        Apri WhatsApp con P.ELLE
      </a>
      <a
        href="tel:+393471841667"
        className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white hover:bg-white/10"
      >
        Chiama 347 184 1667
      </a>
    </div>
  );
}

function OfflinePanel() {
  const [nome, setNome] = useState("");
  const [cellulare, setCellulare] = useState("");
  const [modelloAuto, setModelloAuto] = useState("");
  const [richiesta, setRichiesta] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cellulare, modelloAuto, richiesta }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        mailtoFallback?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setMsg("Richiesta inviata. Ti ricontatteremo al più presto.");
        setNome("");
        setCellulare("");
        setModelloAuto("");
        setRichiesta("");
      } else if (data.mailtoFallback) {
        const subject = encodeURIComponent(`Lead sito — ${nome}`);
        const body = encodeURIComponent(
          `Nome: ${nome}\nCellulare: ${cellulare}\nModello auto: ${modelloAuto}\n\nRichiesta:\n${richiesta}`,
        );
        window.location.href = `mailto:p.ellevernici@gmail.com?subject=${subject}&body=${body}`;
        setMsg("Apertura del client email: completa l'invio da lì, oppure configura SMTP nel server.");
      } else {
        setMsg(data.error ?? "Invio non riuscito. Riprova o usa WhatsApp.");
      }
    } catch {
      setMsg("Errore di rete. Riprova tra qualche istante.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 text-sm">
      <p className="text-zinc-300">
        Siamo chiusi, ma lascia i tuoi dati e modello auto: il team P.ELLE ti ricontatterà via email!
      </p>
      <div>
        <label className="text-xs text-zinc-500" htmlFor="lead-nome">
          Nome
        </label>
        <input
          id="lead-nome"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-[#d32f2f] focus:ring-2"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-500" htmlFor="lead-cell">
          Cellulare
        </label>
        <input
          id="lead-cell"
          required
          inputMode="tel"
          value={cellulare}
          onChange={(e) => setCellulare(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-[#d32f2f] focus:ring-2"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-500" htmlFor="lead-modello">
          Modello auto
        </label>
        <input
          id="lead-modello"
          value={modelloAuto}
          onChange={(e) => setModelloAuto(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-[#d32f2f] focus:ring-2"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-500" htmlFor="lead-richiesta">
          Richiesta
        </label>
        <textarea
          id="lead-richiesta"
          required
          rows={3}
          value={richiesta}
          onChange={(e) => setRichiesta(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none ring-[#d32f2f] focus:ring-2"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-[#d32f2f] py-3 text-sm font-semibold text-white transition hover:bg-[#ef5350] disabled:opacity-60"
      >
        {sending ? "Invio…" : "Invia richiesta"}
      </button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </form>
  );
}
