import Link from "next/link";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/config/brand";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { whatsappHref } from "@/lib/whatsapp";

const nav = [
  { href: "/#chi-siamo", label: "Chi siamo" },
  { href: "/#dove-siamo", label: "Dove siamo" },
  { href: "/#parlano-di-noi", label: "Parlano di noi" },
  { href: "/#servizi", label: "Servizi" },
  { href: "/#catalogo-pdf", label: "Catalogo PDF" },
  { href: "/#simulatore", label: "Simulatore" },
  { href: "/#pelle-priority", label: "P.ELLE Priority" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d1117]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
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
        <nav className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappHref(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#d32f2f] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_0_24px_rgba(211,47,47,0.35)] transition hover:bg-[#ef5350] sm:text-sm"
        >
          <WhatsAppGlyph className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" />
          Preventivo
        </a>
      </div>
    </header>
  );
}
