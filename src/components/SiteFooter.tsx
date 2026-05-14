import Link from "next/link";
import {
  EMAIL_CONTACT,
  LEGAL_NAME,
  PHONE_DISPLAY,
  PHONE_E164,
  STREET_ADDRESS,
  VAT_NUMBER,
} from "@/config/brand";
import { OPENING_HOURS_ROWS } from "@/config/opening-hours";
import { SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM } from "@/config/site-press";

const year = new Date().getFullYear();

function LegalLinksStrip() {
  const items = [
    { href: "/#dove-siamo", label: "Dove siamo" },
    { href: "/#parlano-di-noi", label: "Parlano di noi" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/condizioni-di-vendita", label: "Condizioni di vendita" },
  ] as const;

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 border-b border-white/10 px-4 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:gap-x-2 sm:px-6 sm:text-[11px]"
      aria-label="Link legali"
    >
      {items.map((item, i) => (
        <span key={item.href} className="inline-flex items-center gap-x-1 sm:gap-x-2">
          {i > 0 ? (
            <span className="hidden text-zinc-700 sm:inline" aria-hidden>
              |
            </span>
          ) : null}
          <Link href={item.href} className="hover:text-white">
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1117]">
      <LegalLinksStrip />

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
        <div>
          <p className="text-lg font-semibold text-white">P.ELLE Vernici &amp; Ricambi</p>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Colorificio professionale e autoricambi per carrozzerie e appassionati a Benevento e provincia.
          </p>
        </div>

        <section aria-labelledby="footer-contatti-title">
          <h2 id="footer-contatti-title" className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">
            Contatti e social
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-sm text-zinc-300">
              <p className="font-medium text-zinc-100">Indirizzo</p>
              <p className="mt-2 leading-relaxed text-zinc-400">{STREET_ADDRESS}</p>
            </div>
            <div className="text-sm text-zinc-300">
              <p className="font-medium text-zinc-100">Telefono</p>
              <p className="mt-2">
                <a className="text-white underline-offset-4 hover:underline" href={`tel:${PHONE_E164}`}>
                  +39 {PHONE_DISPLAY}
                </a>
              </p>
              <p className="mt-4 font-medium text-zinc-100">Email</p>
              <p className="mt-2">
                <a
                  className="text-white underline-offset-4 hover:underline"
                  href={`mailto:${EMAIL_CONTACT}`}
                >
                  {EMAIL_CONTACT}
                </a>
              </p>
            </div>
            <div className="text-sm text-zinc-300">
              <p className="font-medium text-zinc-100">Social</p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
                  href={SOCIAL_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram — @p.elle_vernici_e_ricambi
                </a>
                <a
                  className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
                  href={SOCIAL_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook — P.ELLE Vernici e Autoricambi
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="footer-orari-title"
          className="border-t border-white/10 pt-10"
        >
          <h2 id="footer-orari-title" className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300">
            Orari di apertura
          </h2>
          <ul className="mt-4 max-w-md space-y-2 text-sm text-zinc-300">
            {OPENING_HOURS_ROWS.map((row) => (
              <li key={row.label} className="flex justify-between gap-6 border-b border-white/5 py-2">
                <span className="text-zinc-400">{row.label}</span>
                <span className="font-medium tabular-nums text-white">{row.hours}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-white/5 bg-black/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            <span className="text-zinc-400">Ragione sociale:</span> {LEGAL_NAME}
          </p>
          <p>
            <span className="text-zinc-400">P.IVA:</span> {VAT_NUMBER}
          </p>
          <p>© {year} P.ELLE — Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
