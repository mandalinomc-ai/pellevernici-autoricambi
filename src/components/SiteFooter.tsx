import Link from "next/link";
import { SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM } from "@/config/site-press";

const year = new Date().getFullYear();

/** Barra link in stile siti corporate (es. [Rhiag](https://www.rhiag.com/rhiag/)): documenti in maiuscolo in fondo pagina. */
function LegalLinksStrip() {
  const items = [
    { href: "/#dove-siamo", label: "Dove siamo" },
    { href: "/#parlano-di-noi", label: "Parlano di noi" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/condizioni-di-vendita", label: "Condizioni di vendita" },
    { href: "mailto:p.ellevernici@gmail.com", label: "Contatti" },
  ] as const;

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 border-b border-white/10 px-4 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:gap-x-2 sm:px-6 sm:text-[11px]"
      aria-label="Link legali e contatti"
    >
      {items.map((item, i) => (
        <span key={item.href} className="inline-flex items-center gap-x-1 sm:gap-x-2">
          {i > 0 ? (
            <span className="hidden text-zinc-700 sm:inline" aria-hidden>
              |
            </span>
          ) : null}
          {item.href.startsWith("http") || item.href.startsWith("mailto") ? (
            <a href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ) : (
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1117]">
      <LegalLinksStrip />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-lg font-semibold text-white">P.ELLE Vernici &amp; Ricambi</p>
          <p className="mt-2 text-sm text-zinc-400">
            Colorificio professionale e autoricambi per carrozzerie e appassionati a Benevento e
            provincia.
          </p>
        </div>
        <div className="text-sm text-zinc-400">
          <p className="font-medium text-zinc-200">Contatti</p>
          <p className="mt-2">
            Tel:{" "}
            <a className="text-white hover:underline" href="tel:+393471841667">
              +39 347 184 1667
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              className="text-white hover:underline"
              href="mailto:p.ellevernici@gmail.com"
            >
              p.ellevernici@gmail.com
            </a>
          </p>
          <p className="mt-3 leading-relaxed">
            Via Napoli Parco Appia 236
            <br />
            82100 Benevento (BN)
          </p>
          <p className="mt-6 font-medium text-zinc-200">Social</p>
          <div className="mt-3 flex flex-wrap gap-4">
            <a
              className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
              href={SOCIAL_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
              href={SOCIAL_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 bg-black/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            <span className="text-zinc-400">Ragione sociale:</span> P.ELLE VERNICI DI PINTO LAURA
          </p>
          <p>
            <span className="text-zinc-400">P.IVA:</span> 01440270625
          </p>
          <p>© {year} P.ELLE — Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
