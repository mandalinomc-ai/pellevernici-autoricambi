import Link from "next/link";
import { VETRINA_PRODUCTS, vetrinaLabel } from "@/config/vetrina";
import { Reveal } from "./Reveal";

export function VetrinaTeaser() {
  const preview = VETRINA_PRODUCTS.slice(0, 8);

  return (
    <section id="vetrina" className="border-y border-white/10 bg-[#0d1117] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#90caf9]">Vetrina</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            I prodotti del negozio, da consultare prima di passare.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            {VETRINA_PRODUCTS.length} articoli in foto. Sul sito non si compra: prezzo, disponibilità
            e ritiro solo in sede, oppure si organizza su WhatsApp con il negozio.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {preview.map((product) => (
            <li key={product.id}>
              <Link
                href="/vetrina"
                className="block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-[#1565c0]/50"
              >
                <span className="flex aspect-square items-center justify-center bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={`${vetrinaLabel(product.code)} in vetrina`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-2"
                  />
                </span>
                <span className="block px-3 py-3 text-sm font-semibold text-white">
                  {vetrinaLabel(product.code)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/vetrina"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1565c0] px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            Apri tutta la vetrina
          </Link>
        </div>
      </div>
    </section>
  );
}
