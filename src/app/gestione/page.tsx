import type { Metadata } from "next";
import { GestioneApp } from "@/components/GestioneApp";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Gestione vetrina",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function GestionePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <GestioneApp />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
