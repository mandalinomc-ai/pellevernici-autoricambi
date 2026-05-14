import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HomeHero } from "@/components/HomeHero";
import { StorySection } from "@/components/StorySection";
import { ParlanoDiNoiSection } from "@/components/ParlanoDiNoiSection";
import { DoveSiamoSection } from "@/components/DoveSiamoSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ColorSimulator } from "@/components/ColorSimulator";
import { PrioritySection } from "@/components/PrioritySection";
import { PdfCatalogSection } from "@/components/PdfCatalogSection";
import { CartDock } from "@/components/CartDock";
import { CartProvider } from "@/context/cart-context";

/** Home senza cache ISR lunga: riduce HTML vecchio in CDN (es. dopo rimozione asset). */
export const revalidate = 0;

export default function Home() {
  return (
    <CartProvider>
      <div className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">
          <HomeHero />
          <StorySection />
          <ParlanoDiNoiSection />
          <DoveSiamoSection />
          <ServicesSection />
          <PrioritySection />
          <PdfCatalogSection />
          <ColorSimulator />
        </main>
        <SiteFooter />
        <CartDock />
      </div>
    </CartProvider>
  );
}
