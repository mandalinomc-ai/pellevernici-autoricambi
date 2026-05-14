import { Reveal } from "./Reveal";
import {
  ADDRESS_FULL,
  DOVE_SIAMO_IMAGE,
  PAYOFF_LINE,
  getMapsDirectionsHref,
  getMapsEmbedSrc,
  getMapsPlaceHref,
} from "@/config/site-gallery";

export function DoveSiamoSection() {
  const embed = getMapsEmbedSrc();

  return (
    <section id="dove-siamo" className="border-y border-white/10 bg-[#161b22] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#90caf9]">
            Dove siamo
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {PAYOFF_LINE}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-zinc-400">
            Benevento — dal cuore del Sannio. In sede: colorimetria, miscelazione, ricambi e
            consulenza per carrozzerie e appassionati.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-xl">
            <div className="relative aspect-[4/3] w-full">
              {/* Static `public/` path: avoid next/image `/_next/image` proxy failures. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DOVE_SIAMO_IMAGE}
                alt="Interno P.ELLE Vernici: banco miscelazione e scaffali professionali"
                className="absolute inset-0 h-full w-full object-cover brightness-[1.02] contrast-[1.03]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <p className="absolute bottom-0 left-0 right-0 p-4 text-sm text-zinc-200">
                Punto vendita <strong className="text-white">P.ELLE Vernici &amp; Ricambi</strong> —
                ambiente professionale per il refinish.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm font-medium text-white">Indirizzo</p>
              <p className="mt-2 text-lg leading-relaxed text-zinc-200">{ADDRESS_FULL}</p>
              <p className="mt-4 text-sm text-zinc-500">
                Telefono:{" "}
                <a className="text-[#93c5fd] hover:underline" href="tel:+393471841667">
                  +39 347 184 1667
                </a>
                <br />
                Email:{" "}
                <a className="text-[#93c5fd] hover:underline" href="mailto:p.ellevernici@gmail.com">
                  p.ellevernici@gmail.com
                </a>
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={getMapsDirectionsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[#d32f2f] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_0_28px_rgba(211,47,47,0.35)] transition hover:bg-[#ef5350]"
                >
                  Indicazioni da qui (Google Maps)
                </a>
                <a
                  href={getMapsPlaceHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-medium text-white hover:bg-white/10"
                >
                  Apri scheda luogo
                </a>
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                &quot;Indicazioni da qui&quot; apre Google Maps con destinazione già impostata: scegli
                partenza &quot;La tua posizione&quot; per il percorso dalla zona in cui ti trovi. Il
                pin della mappa è centrato su Via Napoli (coordinate da OpenStreetMap).
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-inner">
              <div className="aspect-[16/11] w-full min-h-[260px]">
                <iframe
                  title="Mappa Google — P.ELLE Vernici Benevento"
                  src={embed}
                  className="h-full w-full border-0 grayscale-[0.15] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
