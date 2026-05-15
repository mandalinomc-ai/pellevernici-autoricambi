"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { ACCENT_RED } from "@/config/brand";
import { CAR_PAINT_PRESETS } from "@/config/car-models";
import { PAINT_REFERENCE_ROWS } from "@/config/paint-reference-catalog";
import { CarConfigurator3D } from "@/components/car-configurator/CarConfigurator3D";

export function ColorSimulator() {
  const [hex, setHex] = useState<string>(CAR_PAINT_PRESETS[0].hex);

  return (
    <section id="simulatore" className="bg-[#0d1117] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: ACCENT_RED }}>
            Configuratore colore
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Anteprima colore su modello 3D
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Qui sotto trovi <strong className="font-medium text-zinc-200">un solo modello 3D generico</strong>: è
            pensato solo per un&apos;<strong className="font-medium text-zinc-200">anteprima del colore</strong> che
            scegli, così puoi farti un&apos;idea di come potrebbe venire. Il risultato finale in sede dipende da
            illuminazione, sistema di verniciatura e miscelazione: in cabina ti seguiamo per il match definitivo.
            <strong className="font-medium text-zinc-300"> I metallizzati e le perle reali</strong> cambiano con la
            luce: lo specchietto riproduce famiglie e scale come sui ventagli professionali, non l&apos;effetto flake
            sul monitor.
          </p>
        </Reveal>

        <Reveal delay={0.04}>
          <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
            <div className="flex justify-center bg-gradient-to-b from-zinc-950 to-black px-3 py-6 sm:px-6 sm:py-8">
              {/* Immagine nativa 540×960: niente upscale oltre 540px per evitare sgranatura */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gallery/ventagli-tinte-riferimento.png"
                alt="Ventagli professionali da colorificio: scale di colori Car Refinish con campioni e codici su chip"
                width={540}
                height={960}
                decoding="async"
                className="h-auto max-h-[min(78vh,720px)] w-auto max-w-[min(100%,540px)] rounded-lg object-contain shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
              />
            </div>
            <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-zinc-500 sm:px-6">
              Foto cabina (540 px di larghezza): mostriamo alla risoluzione originale così non viene stirata sul
              monitor. Le tinte della tavolozza 3D e della tabella sotto usano gli stessi HEX delle scale dello
              specchietto. I codici sul chip (formato tipo <span className="font-mono text-zinc-400">61-0xx</span>) in
              sede si leggono sui ventagli fisici.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#161b22]/80">
            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-200">
                Specchietto riferimento (famiglie, codici, sfumature)
              </h3>
              <p className="mt-2 text-xs text-zinc-500">
                Righe ispirate ai ventagli Car Refinish: ogni riga può includere una{" "}
                <strong className="font-medium text-zinc-400">scala di chip</strong> (clic su un quadratino per
                provare quella sfumatura sul 3D). I codici sono indicativi del formato listino, non sostituiscono chip
                e miscelazione in sede.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    <th className="px-4 py-3 sm:px-6">Famiglia / strip</th>
                    <th className="px-4 py-3 sm:px-6">Esempi codice</th>
                    <th className="px-4 py-3 sm:px-6">Nota finitura</th>
                    <th className="px-4 py-3 sm:px-6">Scala &amp; HEX</th>
                  </tr>
                </thead>
                <tbody>
                  {PAINT_REFERENCE_ROWS.map((row) => {
                    const scales = row.gradientHexes?.length ? row.gradientHexes : [row.hexApprox];
                    return (
                      <tr
                        key={row.family}
                        tabIndex={0}
                        onClick={() => setHex(row.hexApprox)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setHex(row.hexApprox);
                          }
                        }}
                        className="cursor-pointer border-b border-white/5 transition hover:bg-white/[0.04] focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1565c0]/50"
                      >
                        <td className="px-4 py-3 font-medium text-zinc-200 sm:px-6">{row.family}</td>
                        <td className="px-4 py-3 text-zinc-400 sm:px-6">{row.codeExamples}</td>
                        <td className="px-4 py-3 text-zinc-500 sm:px-6">{row.shadeNote}</td>
                        <td className="px-4 py-3 sm:px-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex overflow-hidden rounded-lg border border-white/20">
                              {scales.map((h) => (
                                <button
                                  key={`${row.family}-${h}`}
                                  type="button"
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    setHex(h);
                                  }}
                                  className="h-8 min-w-[2rem] flex-1 border-l border-white/10 first:border-l-0 transition hover:brightness-110 focus:z-10 focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
                                  style={{ backgroundColor: h }}
                                  title={h}
                                  aria-label={`Applica colore ${h}`}
                                />
                              ))}
                            </div>
                            <span className="font-mono text-[11px] text-zinc-500">{row.hexApprox}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <div className="mt-10">
          <CarConfigurator3D hex={hex} onHexChange={setHex} />
        </div>
      </div>
    </section>
  );
}
