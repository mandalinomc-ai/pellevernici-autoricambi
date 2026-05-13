import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { StickyWhatsapp } from "@/components/StickyWhatsapp";
import { ChatAssistant } from "@/components/ChatAssistant";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.pellevernici.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "P.ELLE Vernici e Ricambi Benevento | Vernici auto, autoricambi, colorificio professionale BN",
    template: "%s | P.ELLE Vernici e Ricambi",
  },
  description:
    "P.ELLE VERNICI DI PINTO LAURA — vernici auto, autoricambi e colorificio professionale a Benevento (P.IVA 01440270625). Car Refinish System e colorimetria computerizzata.",
  keywords: [
    "vernici auto Benevento",
    "autoricambi Benevento",
    "colorificio professionale BN",
    "miscelazione vernici",
    "colorimetria computerizzata",
    "carrozzeria Benevento",
    "P.ELLE Vernici",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "P.ELLE Vernici e Ricambi",
    title: "P.ELLE Vernici e Ricambi — Benevento",
    description:
      "Vernici auto, autoricambi e colorificio professionale a Benevento. Car Refinish System e supporto dedicato.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0d1117] pb-28 font-sans text-zinc-100">
        {children}
        <CookieBanner />
        <StickyWhatsapp />
        <ChatAssistant />
      </body>
    </html>
  );
}
