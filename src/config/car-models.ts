import { PAINT_REFERENCE_ROWS } from "@/config/paint-reference-catalog";

export type PaintSwatch = { name: string; hex: string };

function hexKey(hex: string) {
  return hex.trim().toLowerCase();
}

/**
 * Tavolozza 3D = stessi HEX dello specchietto ventagli (scale + campioni principali),
 * deduplicati per non ripetere lo stesso pulsante.
 */
function buildVentagliPresets(): PaintSwatch[] {
  const out: PaintSwatch[] = [];
  const seen = new Set<string>();
  for (const row of PAINT_REFERENCE_ROWS) {
    const scales = row.gradientHexes?.length ? row.gradientHexes : [row.hexApprox];
    const short = row.family.replace(/\s*\(.*/, "").trim();
    scales.forEach((hex, idx) => {
      const key = hexKey(hex);
      if (seen.has(key)) return;
      seen.add(key);
      const name = scales.length > 1 ? `${short} · ${idx + 1}` : short;
      out.push({ name, hex });
    });
  }
  return out;
}

export const CAR_PAINT_PRESETS: PaintSwatch[] = buildVentagliPresets();
