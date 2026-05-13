/** Orario operativo richiesto: 09:00–18:00 (fuso Europe/Rome). */

const OPEN_H = 9;
const CLOSE_H = 18;

export function isBusinessOpen(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);

  const hourPart = parts.find((p) => p.type === "hour");
  if (!hourPart) return false;
  const hour = Number.parseInt(hourPart.value, 10);
  if (Number.isNaN(hour)) return false;
  return hour >= OPEN_H && hour < CLOSE_H;
}

export function businessHoursLabel(): string {
  return "09:00 – 18:00 (lun–dom, orario italiano)";
}
