import { PHONE_WA } from "@/config/brand";

export function whatsappHref(text: string, phone: string = PHONE_WA): string {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}
