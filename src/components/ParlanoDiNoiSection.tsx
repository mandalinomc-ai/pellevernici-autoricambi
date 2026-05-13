import { Reveal } from "./Reveal";
import {
  getGoogleBusinessReviewsUrl,
  HIGHLIGHTED_GOOGLE_REVIEWS,
  PRESS_ITEMS,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
} from "@/config/site-press";

function StarRow({ rating }: { rating: number }) {
  const n = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Valutazione ${n} su 5 stelle`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? "text-amber-400" : "text-zinc-600"} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

function IconGoogle() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.4-3.2H13.5V8.6c0-.9.3-1.5 1.6-1.5h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10.6H7v3.2h2.1V22h4.4z" />
    </svg>
  );
}

export function ParlanoDiNoiSection() {
  const reviewsHref = getGoogleBusinessReviewsUrl();

  return (
    <section
      id="parlano-di-noi"
      className="border-y border-white/10 bg-[#161b22] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#93c5fd]">
            Parlano di noi
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Recensioni, stampa e social.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Il giudizio di chi ci sceglie ogni giorno, i servizi che hanno raccontato la nostra
            storia e i canali dove aggiorniamo vetrina, lavori e novità.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <IconGoogle />
                <h3 className="text-lg font-semibold text-white">Recensioni Google</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Alcune recensioni dalla community Google: stelle e commento. Per l&apos;elenco
                completo apri la scheda del negozio.
              </p>
              <ul className="mt-5 flex max-h-[min(52vh,520px)] flex-col gap-3 overflow-y-auto pr-1">
                {HIGHLIGHTED_GOOGLE_REVIEWS.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-xl border border-white/10 bg-black/30 p-4"
                  >
                    <StarRow rating={r.rating} />
                    <p className="mt-2 text-sm leading-relaxed text-zinc-200">&ldquo;{r.text}&rdquo;</p>
                    <p className="mt-2 text-xs text-zinc-500">
                      <span className="font-medium text-zinc-400">{r.author}</span>
                      {r.date ? <span> · {r.date}</span> : null}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={reviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition hover:bg-zinc-200"
                >
                  Apri tutte le recensioni su Google
                </a>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Suggerimento: in Google Business, copia il link &quot;Condividi&quot; della scheda
                  e incollalo in{" "}
                  <code className="rounded bg-black/40 px-1 text-[10px] text-zinc-400">
                    NEXT_PUBLIC_GOOGLE_REVIEWS_URL
                  </code>{" "}
                  nel file <code className="text-[10px] text-zinc-500">.env.local</code> per aprire
                  direttamente la pagina giusta.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-white">Stampa e articoli</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Servizi e articoli che hanno parlato di P.ELLE: clic per aprire il pezzo completo o
                il video sul sito dell&apos;emittente.
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-4">
                {PRESS_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-[#1565c0]/50 hover:bg-white/[0.05]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#fca5a5]">
                        {item.source}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white group-hover:underline">
                        {item.title}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-white">Seguici online</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Foto da negozio e cabina, novità prodotti e dietro le quinte del colorificio su
                Instagram e Facebook.
              </p>
              <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
                <a
                  href={SOCIAL_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-r from-[#f09433]/20 via-[#dc2743]/15 to-[#bc1888]/20 px-4 py-3 text-sm font-medium text-white transition hover:border-white/25"
                >
                  <IconInstagram />
                  Instagram — @p.elle_vernici_e_ricambi
                </a>
                <a
                  href={SOCIAL_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#1877f2]/10 px-4 py-3 text-sm font-medium text-white transition hover:border-[#1877f2]/50"
                >
                  <IconFacebook />
                  Facebook — P.ELLE Vernici e Autoricambi
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
