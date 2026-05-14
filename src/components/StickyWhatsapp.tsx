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
      className="fixed bottom-5 right-5 z-[60] inline-flex max-w-[calc(100vw-2.5rem)] items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(37,211,102,0.55)] sm:bottom-8 sm:right-8 sm:gap-3 sm:px-5 sm:py-3.5"
      aria-label="Contattaci ora su WhatsApp"
    >
      <WhatsAppGlyph className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" aria-hidden />
      <span className="pr-0.5 leading-tight">Contattaci ora</span>
    </a>
  );
}
