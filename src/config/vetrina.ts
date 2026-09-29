import catalog from "@/config/vetrina-catalog.json";

export type VetrinaProduct = {
  id: string;
  code: string;
  images: string[];
};

export const VETRINA_PRODUCTS = catalog as VetrinaProduct[];

export function vetrinaLabel(code: string): string {
  return `Articolo ${code}`;
}

export function vetrinaWhatsappText(code: string): string {
  return [
    "Ciao P.ELLE Vernici e Ricambi,",
    `vorrei informazioni e disponibilità in sede per l'articolo n. ${code} della vetrina.`,
    "Non acquisto dal sito: possiamo organizzare su WhatsApp oppure in negozio.",
    "Grazie.",
  ].join("\n");
}
