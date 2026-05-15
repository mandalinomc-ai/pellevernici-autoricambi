"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { CAR_PAINT_PRESETS } from "@/config/car-models";
import { normalizeHex } from "@/lib/color-hex";

const CarConfiguratorCanvas = dynamic(() => import("./CarConfiguratorCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-[16/10] w-full min-h-[280px] items-center justify-center rounded-2xl bg-[#0d1117] text-sm text-zinc-500">
      Caricamento visualizzazione 3D…
    </div>
  ),
});

type Props = {
  hex: string;
  onHexChange: (next: string) => void;
};

export function CarConfigurator3D({ hex, onHexChange }: Props) {
  const safeHex = useMemo(() => normalizeHex(hex), [hex]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] shadow-[0_0_60px_rgba(21,101,192,0.12)]">
        <div className="relative aspect-[16/10] w-full bg-[#0d1117]">
          <CarConfiguratorCanvas hex={safeHex} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm leading-relaxed text-zinc-300">
            Qui trovi <strong className="text-white">un solo modello 3D generico</strong>: serve semplicemente come{" "}
            <strong className="text-white">anteprima del colore</strong> che scegli, per farti un&apos;idea di come
            potrebbe venire sulla carrozzeria. Non corrisponde a un modello reale in scala 1:1 né al risultato finale
            in cabina di verniciatura.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-200">Tavolozza colori</p>
          <p className="mt-1 text-xs text-zinc-500">
            Campioni = stessi colori dello specchietto ventagli sopra (HEX deduplicati). Tocca un quadrato o usa il
            selettore sotto.
          </p>
          <div className="mt-3 max-h-[min(40vh,320px)] overflow-y-auto overflow-x-hidden pr-1">
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-10">
            {CAR_PAINT_PRESETS.map((p) => {
              const active = normalizeHex(hex) === normalizeHex(p.hex);
              return (
                <button
                  key={p.hex + p.name}
                  type="button"
                  title={p.name}
                  onClick={() => onHexChange(p.hex)}
                  className={`relative aspect-square rounded-lg border-2 transition ${
                    active ? "border-white ring-2 ring-[#d32f2f]" : "border-white/15 hover:border-white/40"
                  }`}
                  style={{ backgroundColor: p.hex }}
                  aria-label={p.name}
                />
              );
            })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-medium text-zinc-200">Colore preciso (senza codice HEX)</p>
          <p className="mt-1 text-xs text-zinc-500">
            Usa il selettore nativo del browser: trascina nel cerchio e nelle barre per tonalità, saturazione e
            luminosità. Il valore HEX si aggiorna nel campo accanto.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <div className="flex flex-1 flex-col items-center gap-2">
              <label htmlFor="hex-3d-native" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Selettore
              </label>
              <input
                id="hex-3d-native"
                type="color"
                value={safeHex}
                onChange={(e) => onHexChange(e.target.value)}
                className="h-28 w-full max-w-[200px] cursor-pointer rounded-xl border border-white/15 bg-transparent p-1 shadow-inner sm:h-32"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="hex-3d" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Codice HEX
              </label>
              <input
                id="hex-3d"
                type="text"
                value={hex}
                onChange={(e) => onHexChange(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 font-mono text-sm text-white outline-none ring-[#d32f2f] focus:ring-2"
                placeholder="#d32f2f"
                spellCheck={false}
              />
              <p className="text-xs leading-relaxed text-zinc-500">
                Rendering 3D: la lamiera verniciata segue il colore; vetri e gomme restano neutri.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
