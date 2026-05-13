import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { ParlanoDiNoiSection } from "@/components/ParlanoDiNoiSection";
import { DoveSiamoSection } from "@/components/DoveSiamoSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ColorSimulator } from "@/components/ColorSimulator";
import { PrioritySection } from "@/components/PrioritySection";
import { PdfCatalogSection } from "@/components/PdfCatalogSection";
import { CartDock } from "@/components/CartDock";
import { CartProvider } from "@/context/cart-context";

export default function Home() {
  return (
    <CartProvider>
      <div className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">
          <HeroSection />
          <StorySection />
          <ParlanoDiNoiSection />
          <DoveSiamoSection />
          <ServicesSection />
          <PdfCatalogSection />
          <ColorSimulator />
          <PrioritySection />
        </main>
        <SiteFooter />
        <CartDock />
      </div>
    </CartProvider>
  );
}
