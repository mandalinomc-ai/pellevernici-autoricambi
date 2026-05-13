/** Config sito: payoff, sede, mappa, immagine “Dove siamo” in `public/gallery/`. */

export const PAYOFF_LINE =
  "Esperti in Car Refinish System e ricambi auto a Benevento: colorimetria, miscelazione e qualità in sede.";

export const ADDRESS_FULL = "Via Napoli Parco Appia 236, 82100 Benevento (BN)";

/** Centro mappa (Via Napoli, Benevento — Nominatim OSM). */
export const MAP_LAT = "41.122524";
export const MAP_LON = "14.771904";

/** Panoramica negozio per “Dove siamo”. */
export const DOVE_SIAMO_IMAGE = "/hero/negozio-interno-home.png";

/**
 * Sfondo hero (foto negozio in sede).
 * Priorità: `NEXT_PUBLIC_HERO_IMAGE_URL` → `public/hero/negozio-interno-home.png`.
 */
export function getHeroBackgroundSrc(): string {
  const env =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_HERO_IMAGE_URL?.trim() : "";
  if (env) return env;
  return "/hero/negozio-interno-home.png";
}

/** Usato solo se l’immagine locale hero non è disponibile (es. prima di caricare le foto in `public/gallery/`). */
export const HERO_BACKGROUND_REMOTE_FALLBACK =
  "https://images.pexels.com/photos/7994438/pexels-photo-7994438.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop";

/** URL iframe Google Maps. Priorità: env → coordinate OSM (pin stabile su Via Napoli). */
export function getMapsEmbedSrc(): string {
  const custom =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_MAPS_EMBED_URL?.trim() : "";
  if (custom) return custom;
  return `https://maps.google.com/maps?q=${MAP_LAT}%2C${MAP_LON}&hl=it&z=17&output=embed`;
}

export function getMapsDirectionsHref(): string {
  const dest = encodeURIComponent(`${MAP_LAT},${MAP_LON}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
}

export function getMapsPlaceHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${MAP_LAT},${MAP_LON}`;
}
