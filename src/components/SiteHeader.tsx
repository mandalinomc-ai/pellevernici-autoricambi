"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/config/brand";
import { HOME_SECTION_NAV } from "@/config/site-nav";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { whatsappHref } from "@/lib/whatsapp";

export function SiteHeader() {
  const [indiceOpen, setIndiceOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!indiceOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIndiceOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndiceOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [indiceOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d1117]/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:px-6">
        {/* Riga 1: logo + azioni (niente menu sezioni qui → niente sovrapposizioni) */}
        <div className="flex items-center justify-between gap-3 pb-3">
          <Link href="/#hero" className="group min-w-0 shrink-0 touch-manipulation flex flex-col leading-tight active:opacity-90" title="Torna alla home">
            <span className="font-semibold tracking-tight text-white">
              P.ELLE{" "}
              <span className="bg-gradient-to-r from-[#d32f2f] via-white to-[#1565c0] bg-clip-text text-transparent">
                Vernici &amp; Ricambi
              </span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Benevento · Car Refinish System
            </span>
          </Link>

          <div ref={wrapRef} className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                id={`${menuId}-btn`}
                aria-expanded={indiceOpen}
                aria-controls={`${menuId}-panel`}
                aria-haspopup="menu"
                onClick={() => setIndiceOpen((o) => !o)}
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-200 transition hover:border-[#1565c0]/50 hover:bg-white/10 sm:min-h-0 sm:px-3 sm:py-2 sm:text-xs"
              >
                Indice
                <span
                  className={`text-[10px] text-zinc-500 transition ${indiceOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>
              {indiceOpen ? (
                <div
                  id={`${menuId}-panel`}
                  role="menu"
                  aria-labelledby={`${menuId}-btn`}
                  className="absolute right-0 top-[calc(100%+6px)] z-50 w-[min(calc(100vw-2rem),320px)] rounded-2xl border border-white/10 bg-[#161b22]/98 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl sm:w-[280px]"
                >
                  <ul className="max-h-[min(60vh,400px)] overflow-y-auto overscroll-contain py-1">
                    {HOME_SECTION_NAV.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          role="menuitem"
                          className="block min-h-11 px-4 py-3 text-sm leading-snug text-zinc-200 transition hover:bg-white/10 hover:text-white active:bg-white/10"
                          onClick={() => setIndiceOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <a
              href={whatsappHref(WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#d32f2f] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white shadow-[0_0_24px_rgba(211,47,47,0.35)] transition active:scale-[0.98] hover:bg-[#ef5350] sm:gap-2.5 sm:px-4 sm:text-xs"
            >
              <WhatsAppGlyph className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" />
              <span className="max-w-[7.5rem] leading-tight sm:max-w-none">Contattaci ora</span>
            </a>
          </div>
        </div>

        {/* Riga 2: menu sezioni (tutta la larghezza, scroll orizzontale se serve) */}
        <nav
          className="-mx-4 flex touch-pan-x gap-x-2 gap-y-2 overflow-x-auto overflow-y-hidden overscroll-x-contain border-t border-white/10 px-4 py-3 [scrollbar-width:thin] sm:-mx-6 sm:px-6 md:justify-center"
          aria-label="Sezioni principali"
        >
          {HOME_SECTION_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3.5 py-2 text-[11px] font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white active:bg-white/15 sm:min-h-0 sm:text-xs lg:px-3.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
