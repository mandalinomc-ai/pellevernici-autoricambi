"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import {
  getHeroBackgroundSrc,
  HERO_BACKGROUND_REMOTE_FALLBACK,
} from "@/config/site-gallery";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/config/brand";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { whatsappHref } from "@/lib/whatsapp";

export function HeroSection() {
  const [bgSrc, setBgSrc] = useState(() => getHeroBackgroundSrc());

  const onBgError = useCallback(() => {
    setBgSrc((current) =>
      current === HERO_BACKGROUND_REMOTE_FALLBACK ? current : HERO_BACKGROUND_REMOTE_FALLBACK,
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate min-h-[min(78vh,720px)] overflow-hidden border-b border-white/10 px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt="Interno del punto vendita P.ELLE Vernici a Benevento"
          onError={onBgError}
          className="h-full w-full scale-[1.03] object-cover object-center"
          fetchPriority="high"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0d1117]/70 via-[#0d1117]/45 to-[#0d1117]/82"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[#0d1117]/30"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-grain opacity-[0.12]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#d32f2f]/20 blur-[100px]" />
        <div className="absolute right-0 top-32 h-[420px] w-[420px] rounded-full bg-[#1565c0]/18 blur-[120px]" />
        <div className="smoke-layer opacity-28" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl min-w-0">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0 max-w-full"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#90caf9]">
              Car Refinish System · Benevento
            </p>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="font-display mt-6 max-w-5xl text-3xl font-semibold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.5)] sm:text-4xl lg:text-5xl"
        >
          P.ELLE Vernici e Autoricambi: Il Colore Perfetto per la tua Passione.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-200 sm:text-xl"
        >
          Esperti in Car Refinish System e ricambi auto a Benevento. Dalla precisione della
          colorimetria computerizzata alla qualità dei migliori componenti meccanici.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={whatsappHref(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#d32f2f] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_0_40px_rgba(211,47,47,0.45)] transition hover:bg-[#ef5350]"
          >
            <WhatsAppGlyph className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            Preventivo rapido su WhatsApp
          </a>
          <a
            href="#simulatore"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-[#1565c0]/60 hover:bg-white/10"
          >
            Configuratore colore
          </a>
        </motion.div>
      </div>
    </section>
  );
}
