import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { PrivacyPolicyBody, TitolareDelTrattamento } from "@/content/legal-sections";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali — P.ELLE VERNICI DI PINTO LAURA, Benevento.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      current="privacy"
      title="Privacy Policy"
      intro="Informativa resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR) e della normativa nazionale vigente in materia di protezione dei dati personali."
    >
      <TitolareDelTrattamento />
      <PrivacyPolicyBody />
    </LegalShell>
  );
}
