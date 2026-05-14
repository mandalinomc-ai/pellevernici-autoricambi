import { OPENING_HOURS_ROWS } from "@/config/opening-hours";

/** Giorno breve en-US in Europe/Rome (Mon, Tue, … Sun). */
function romeWeekdayShort(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    weekday: "short",
  }).format(date);
}

/** Ora 0–23 in Europe/Rome. */
function romeHour(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);
  const h = parts.find((p) => p.type === "hour")?.value;
  const hour = Number.parseInt(h ?? "0", 10);
  return Number.isNaN(hour) ? 0 : hour;
}

/** Lunedì–venerdì 08–19, sabato 08–13, domenica chiuso (fuso Europe/Rome). */
export function isBusinessOpen(date: Date = new Date()): boolean {
  const wd = romeWeekdayShort(date);
  const hour = romeHour(date);
  if (wd === "Sun") return false;
  if (wd === "Sat") return hour >= 8 && hour < 13;
  if (wd === "Mon" || wd === "Tue" || wd === "Wed" || wd === "Thu" || wd === "Fri") {
    return hour >= 8 && hour < 19;
  }
  return false;
}

export function businessHoursLabel(): string {
  return "Lun–ven 08–19, sab 08–13, dom chiuso (ora Italia)";
}
