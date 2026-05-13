"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const items = [
  {
    id: "vernici",
    title: "Car Refinish & colorimetria",
    subtitle: "Sistemi computerizzati",
    body: "Car Refinish & Colorimetria: Utilizziamo sistemi computerizzati all'avanguardia per garantire la riproduzione esatta di qualsiasi codice colore originale.",
    accent: "from-[#d32f2f]/35 to-transparent",
  },
  {
    id: "autoricambi",
    title: "Autoricambi & accessori",
    subtitle: "Componenti selezionati",
    body: "Autoricambi & Accessori: Una vasta gamma di ricambi delle migliori marche. Selezioniamo solo componenti che garantiscono sicurezza e prestazioni elevate.",
    accent: "from-[#1565c0]/35 to-transparent",
    detailImage: "/gallery/ricambi-marchi-costruttori.png",
    detailImageAlt:
      "Marchi automotive: alcuni dei costruttori e brand su cui lavoriamo per ricambi e componenti.",
  },
] as const;

export function ServicesSection() {
  const [open, setOpen] = useState<string | null>("vernici");

  return (
    <section id="servizi" className="border-y border-white/10 bg-[#161b22] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#90caf9]">
            Servizi
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Due pilastri: finitura e affidabilità.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Colorificio professionale e punto vendita ricambi a Benevento — tocca una card per
            approfondire.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((item, i) => {
            const expanded = open === item.id;
            return (
              <Reveal key={item.id} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : item.id)}
                  className={`group relative w-full overflow-hidden rounded-2xl border text-left transition ${
                    expanded
                      ? item.id === "autoricambi"
                        ? "border-[#1565c0]/50 bg-white/[0.06] shadow-[0_0_40px_rgba(21,101,192,0.18)]"
                        : "border-[#d32f2f]/50 bg-white/[0.06] shadow-[0_0_40px_rgba(211,47,47,0.15)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80`}
                  />
                  <div className="relative p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-[#90caf9]">{item.subtitle}</p>
                      </div>
                      <span
                        className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg transition ${
                          expanded
                            ? item.id === "autoricambi"
                              ? "rotate-45 border-[#1565c0] bg-[#1565c0]/20 text-white"
                              : "rotate-45 border-[#d32f2f] bg-[#d32f2f]/20 text-white"
                            : "border-white/15 text-zinc-400 group-hover:text-white"
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </div>
                    {"detailImage" in item && item.detailImage ? (
                      <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.detailImage}
                          alt={item.detailImageAlt}
                          className="max-h-[min(48vh,380px)] w-full object-contain object-center"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
