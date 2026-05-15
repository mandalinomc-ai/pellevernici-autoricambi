"use client";

import Link from "next/link";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/config/brand";
import { HOME_SECTION_NAV } from "@/config/site-nav";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { whatsappHref } from "@/lib/whatsapp";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d1117]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/#hero" className="group shrink-0 flex-col leading-tight" title="Torna alla home">
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

        <nav
          className="hidden min-w-0 flex-1 justify-center gap-x-1.5 overflow-x-auto whitespace-nowrap text-[11px] font-medium text-zinc-300 md:flex lg:gap-x-2.5 lg:text-xs"
          aria-label="Sezioni principali"
        >
          {HOME_SECTION_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-2 py-1 transition hover:bg-white/10 hover:text-white lg:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 md:ml-0">
          <details className="group relative">
            <summary className="list-none [&::-webkit-details-marker]:hidden">
              <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-200 transition hover:border-[#1565c0]/50 hover:bg-white/10 sm:text-xs">
                Indice
                <span className="text-[10px] text-zinc-500 transition group-open:rotate-180" aria-hidden>
                  ▼
                </span>
              </span>
            </summary>
            <div
              className="absolute right-0 top-[calc(100%+6px)] z-50 w-[min(calc(100vw-2rem),320px)] rounded-2xl border border-white/10 bg-[#161b22]/98 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl sm:w-[280px]"
              role="menu"
            >
              <ul className="max-h-[min(70vh,440px)] overflow-y-auto py-1">
                {HOME_SECTION_NAV.map((item) => (
                  <li key={`dd-${item.href}`}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-zinc-200 transition hover:bg-white/10 hover:text-white"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <a
            href={whatsappHref(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d32f2f] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white shadow-[0_0_24px_rgba(211,47,47,0.35)] transition hover:bg-[#ef5350] sm:gap-2.5 sm:px-4 sm:text-xs"
          >
            <WhatsAppGlyph className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" />
            <span className="max-w-[7.5rem] leading-tight sm:max-w-none">Contattaci ora</span>
          </a>
        </div>
      </div>
    </header>
  );
}
