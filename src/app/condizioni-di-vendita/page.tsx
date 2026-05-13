import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { CondizioniDiVenditaBody } from "@/content/legal-sections";

export const metadata: Metadata = {
  title: "Condizioni di vendita",
  description:
    "Condizioni generali di vendita — P.ELLE VERNICI DI PINTO LAURA, Benevento.",
};

export default function CondizioniDiVenditaPage() {
  return (
    <LegalShell
      current="condizioni"
      title="Condizioni di vendita"
      intro="Condizioni generali di vendita dei prodotti e dei servizi connessi offerti da P.ELLE Vernici e Ricambi, salvo diverso accordo scritto tra le parti."
    >
      <CondizioniDiVenditaBody />
    </LegalShell>
  );
}
