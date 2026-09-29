"use client";

import { useEffect, useMemo, useState } from "react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import {
  VETRINA_PRODUCTS,
  vetrinaLabel,
  vetrinaWhatsappText,
  type VetrinaProduct,
} from "@/config/vetrina";
import { useCart } from "@/context/cart-context";
import { whatsappHref } from "@/lib/whatsapp";

const PAGE = 24;

export function VetrinaBrowser() {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const [active, setActive] = useState<VetrinaProduct | null>(null);
  const [photo, setPhoto] = useState(0);
  const [added, setAdded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.replace(/\D/g, "");
    if (!q) return VETRINA_PRODUCTS;
    return VETRINA_PRODUCTS.filter((p) => p.code.includes(q));
  }, [query]);

  const shown = filtered.slice(0, visible);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  const open = (product: VetrinaProduct) => {
    setPhoto(0);
    setAdded(null);
    setActive(product);
  };

  const addProduct = (product: VetrinaProduct) => {
    add(`${vetrinaLabel(product.code)} (vetrina)`);
    setAdded(product.id);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block min-w-0 flex-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Cerca per numero articolo
          </span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
            inputMode="numeric"
            placeholder="Es. 12, 150, 250"
            className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white outline-none placeholder:text-zinc-500 focus:border-[#1565c0]"
          />
        </label>
        <p className="text-sm text-zinc-400">
          {filtered.length} articol{filtered.length === 1 ? "o" : "i"} in vetrina
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-zinc-300">
          Nessun articolo con questo numero. Prova solo le cifre della foto, oppure scrivi al
          negozio su WhatsApp.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shown.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => open(product)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-[#1565c0]/50"
              >
                <span className="flex aspect-square items-center justify-center bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={`${vetrinaLabel(product.code)}, prodotto in vetrina P.ELLE`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-2"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-1 px-3 py-3">
                  <span className="text-sm font-semibold text-white">{vetrinaLabel(product.code)}</span>
                  <span className="text-[11px] uppercase tracking-wide text-[#90caf9]">
                    Solo in sede
                    {product.images.length > 1 ? ` · ${product.images.length} foto` : ""}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {visible < filtered.length ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((n) => n + PAGE)}
            className="min-h-11 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Mostra altri ({filtered.length - visible} rimasti)
          </button>
        </div>
      ) : null}

      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-6"
          role="presentation"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vetrina-dialog-title"
            className="relative flex max-h-[min(92vh,860px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#161b22] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 rounded-full border border-black/10 bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow hover:bg-white"
            >
              Chiudi
            </button>
            <div className="grid min-h-0 flex-1 gap-0 overflow-y-auto md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="relative bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.images[photo] ?? active.images[0]}
                  alt={`${vetrinaLabel(active.code)}, foto ${photo + 1}`}
                  className="aspect-square w-full object-contain"
                />
                {active.images.length > 1 ? (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {active.images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setPhoto(i)}
                        className={`h-2.5 w-2.5 rounded-full ${i === photo ? "bg-[#d32f2f]" : "bg-black/30"}`}
                        aria-label={`Foto ${i + 1}`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <div className="pr-16">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#90caf9]">
                    Vetrina
                  </p>
                  <h2 id="vetrina-dialog-title" className="mt-1 text-2xl font-semibold text-white">
                    {vetrinaLabel(active.code)}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">
                  Questo articolo non si compra sul sito. Per prezzo, disponibilità e ritiro passa in
                  sede in Via Napoli Parco Appia 236, Benevento, oppure organizza tutto su WhatsApp
                  citando il numero articolo.
                </p>
                {active.images.length > 1 ? (
                  <div className="flex gap-2">
                    {active.images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setPhoto(i)}
                        className={`h-16 w-16 overflow-hidden rounded-lg border bg-white ${
                          i === photo ? "border-[#d32f2f]" : "border-white/20"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="h-full w-full object-contain" />
                      </button>
                    ))}
                  </div>
                ) : null}
                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={whatsappHref(vetrinaWhatsappText(active.code))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:brightness-110"
                  >
                    <WhatsAppGlyph className="h-5 w-5" />
                    Chiedi info su WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => addProduct(active)}
                    className="min-h-11 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    {added === active.id ? "Aggiunto alla lista" : "Aggiungi alla lista WhatsApp"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
