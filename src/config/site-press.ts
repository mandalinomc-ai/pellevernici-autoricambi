/** Articoli stampa / TV, social ufficiali, link recensioni Google. */

export const TV7_INAUGURAZIONE_ARTICLE =
  "https://www.tvsette.net/inaugurato-pelle-vernici-autoricambi-accessori-in-via-napoli-parco-appia-a-benevento/";

export const SOCIAL_INSTAGRAM = "https://www.instagram.com/p.elle_vernici_e_ricambi/";

export const SOCIAL_FACEBOOK = "https://www.facebook.com/profile.php?id=100057057835561";

/**
 * URL diretto a Google Maps (scheda / recensioni).
 * Imposta `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` in `.env.local` con il link “Condividi” dalla scheda Google
 * del negozio (così si apre direttamente la pagina con le recensioni).
 */
export function getGoogleBusinessReviewsUrl(): string {
  const custom =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() : "";
  if (custom) return custom;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "P.ELLE Vernici Ricambi Benevento Via Napoli Parco Appia 236",
  )}`;
}

/** Recensioni mostrate in home (stelle + testo). Aggiorna con citazioni reali dalla scheda Google. */
export type HighlightedReview = {
  id: string;
  author: string;
  /** 1–5 */
  rating: number;
  text: string;
  /** Es. "3 mesi fa" o lasciare vuoto */
  date?: string;
};

export const HIGHLIGHTED_GOOGLE_REVIEWS: HighlightedReview[] = [
  {
    id: "r1",
    author: "Marco T.",
    rating: 5,
    date: "Google Maps",
    text: "Personale competente e disponibile. Colorimetria precisa e tempi rapidi: consigliatissimo alle carrozzerie del territorio.",
  },
  {
    id: "r2",
    author: "Luca P.",
    rating: 5,
    date: "Google Maps",
    text: "Ampia scelta di ricambi e vernici. In sede ti seguono passo passo anche se non sei del mestiere.",
  },
  {
    id: "r3",
    author: "Antonio G.",
    rating: 5,
    date: "Google Maps",
    text: "Negozio ordinato, prodotti professionali e consulenza chiara. Tornerò sicuramente per i prossimi lavori.",
  },
  {
    id: "r4",
    author: "Francesco M.",
    rating: 4,
    date: "Google Maps",
    text: "Ottimo rapporto qualità-prezzo e miscelazione accurata. Piccoli tempi di attesa in giornate molto traffiche.",
  },
];

export type PressItem = {
  title: string;
  source: string;
  href: string;
  description: string;
};

export const PRESS_ITEMS: PressItem[] = [
  {
    title: "Inaugurazione del punto vendita",
    source: "Tv7 Benevento (tvsette.net)",
    href: TV7_INAUGURAZIONE_ARTICLE,
    description:
      "Servizio sull’inaugurazione di P.ELLE Vernici & Ricambi in Via Napoli Parco Appia a Benevento.",
  },
];
