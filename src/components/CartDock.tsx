"use client";

import { useState } from "react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { useCart } from "@/context/cart-context";

export function CartDock() {
  const { items, count, remove, setQty, clear, orderWhatsAppHref } = useCart();
  const [open, setOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-5 z-[58] flex max-w-[min(100vw-2rem,22rem)] flex-col items-end gap-2 sm:bottom-28 sm:right-8">
      {open ? (
        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f18]/98 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <p className="text-sm font-semibold text-white">Carrello ordine</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-zinc-500 hover:text-white"
            >
              Chiudi
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto px-3 py-2 text-sm">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex flex-col gap-2 border-b border-white/5 py-3 last:border-0"
              >
                <span className="text-zinc-200">{it.label}</span>
                {it.page != null ? (
                  <span className="text-[10px] uppercase tracking-wide text-zinc-500">
                    Pag. {it.page}
                  </span>
                ) : null}
                <div className="flex items-center gap-2">
                  <label className="sr-only" htmlFor={`qty-${it.id}`}>
                    Quantità
                  </label>
                  <input
                    id={`qty-${it.id}`}
                    type="number"
                    min={1}
                    max={999}
                    value={it.qty}
                    onChange={(e) => setQty(it.id, Number(e.target.value))}
                    className="w-16 rounded border border-white/10 bg-black/40 px-2 py-1 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Rimuovi
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
            <button
              type="button"
              onClick={() => clear()}
              className="rounded-full border border-white/15 px-3 py-2 text-xs text-zinc-300 hover:bg-white/5"
            >
              Svuota
            </button>
            {orderWhatsAppHref ? (
              <a
                href={orderWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.25rem] flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-center text-xs font-semibold text-white hover:brightness-110"
              >
                <WhatsAppGlyph className="h-4 w-4 shrink-0" />
                Invia ordine su WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-[#d32f2f]/40 bg-[#0d1117]/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_0_24px_rgba(211,47,47,0.25)] backdrop-blur"
        aria-expanded={open}
      >
        Carrello ({count})
      </button>
    </div>
  );
}
