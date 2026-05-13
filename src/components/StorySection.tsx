"use client";

import { useCallback, useState } from "react";
import { Reveal } from "./Reveal";

const FALLBACK_VIDEO =
  "https://videos.pexels.com/video-files/6873508/6873508-hd_1920_1080_25fps.mp4";

const TV7_ARTICLE_URL =
  "https://www.tvsette.net/inaugurato-pelle-vernici-autoricambi-accessori-in-via-napoli-parco-appia-a-benevento/";

export function StorySection() {
  const env =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_STORY_VIDEO_URL?.trim() : "";
  const initial = env && env.length > 0 ? env : "/video/inaugurazione.mp4";
  const [src, setSrc] = useState(initial);

  const onVideoError = useCallback(() => {
    setSrc((current) => (current === FALLBACK_VIDEO ? current : FALLBACK_VIDEO));
  }, []);

  return (
    <section id="chi-siamo" className="relative isolate min-h-[85vh] overflow-hidden bg-black">
      <video
        key={src}
        className="absolute inset-0 h-full w-full object-cover opacity-[0.42]"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        onError={onVideoError}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/92 via-[#0d1117]/82 to-[#0d1117]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light">
        <div className="smoke-layer h-full w-full opacity-25" aria-hidden />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#90caf9]">
            La nostra storia
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Dal Silenzio di un Garage al Traguardo di Via Napoli.
          </h2>
        </Reveal>
        <Reveal
          delay={0.12}
          className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-zinc-100 sm:text-lg"
        >
          <p className="text-base leading-relaxed text-zinc-100 sm:text-lg">
            {
              "P.ELLE Vernici non è solo un'attività, è il risultato di un sogno nato tra le mura di un piccolo garage. La nostra storia è fatta di mani sporche di colore, anni di sacrifici immensi e una dedizione totale della nostra famiglia verso l'eccellenza. Ogni traguardo raggiunto, fino all'apertura della nostra sede in Via Napoli Parco Appia, è stato costruito un barattolo alla volta, con l'unico obiettivo di offrire ai professionisti e ai privati di Benevento il massimo della qualità."
            }
          </p>
          <p className="text-sm text-zinc-400">
            Servizio e cronaca sull&apos;inaugurazione:{" "}
            <a
              href={TV7_ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#90caf9] underline decoration-[#90caf9]/40 underline-offset-4 hover:decoration-[#90caf9]"
            >
              Tv7 Benevento — articolo e video
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
