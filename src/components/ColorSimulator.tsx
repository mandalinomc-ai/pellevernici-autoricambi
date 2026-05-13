"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { ACCENT_RED } from "@/config/brand";
import { CAR_PAINT_PRESETS } from "@/config/car-models";
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
          </p>
        </Reveal>

        <div className="mt-10">
          <CarConfigurator3D hex={hex} onHexChange={setHex} />
        </div>
      </div>
    </section>
  );
}
