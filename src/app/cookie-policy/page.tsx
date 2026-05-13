import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { CookiePolicyBody } from "@/content/legal-sections";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sui cookie e tecnologie simili — P.ELLE VERNICI DI PINTO LAURA, Benevento.",
};

export default function CookiePolicyPage() {
  return (
    <LegalShell
      current="cookie"
      title="Cookie Policy"
      intro="Informativa sui cookie e strumenti affini utilizzati dal presente sito web, con indicazioni su finalità, tipologie e modalità di gestione delle preferenze."
    >
      <CookiePolicyBody />
    </LegalShell>
  );
}
