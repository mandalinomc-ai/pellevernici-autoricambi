import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VetrinaBrowser } from "@/components/VetrinaBrowser";
import { VETRINA_PRODUCTS } from "@/config/vetrina";

export const metadata: Metadata = {
  title: "Vetrina prodotti",
  description:
    "Vetrina P.ELLE Vernici e Ricambi a Benevento: consulta gli articoli e chiedi prezzo e disponibilità in sede o su WhatsApp. Nessun acquisto online.",
  alternates: { canonical: "/vetrina" },
};

export default function VetrinaPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#90caf9]">
            Solo vetrina
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prodotti in negozio
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-300">
            {VETRINA_PRODUCTS.length} articoli fotografati. Non c&apos;è pagamento sul sito: per
            info e acquisto passa in sede, oppure scrivi su WhatsApp e organizzi col negozio. Il
            numero articolo è quello della scheda: indicalo nel messaggio.
          </p>
          <div className="mt-10">
            <VetrinaBrowser />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
