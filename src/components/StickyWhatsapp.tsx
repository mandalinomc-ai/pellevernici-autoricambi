import { WHATSAPP_DEFAULT_MESSAGE } from "@/config/brand";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { whatsappHref } from "@/lib/whatsapp";

export function StickyWhatsapp() {
  const href = whatsappHref(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,211,102,0.55)] sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      aria-label="Contatta P.ELLE su WhatsApp"
    >
      <WhatsAppGlyph className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}
