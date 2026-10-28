// Every price, date, time, count and list on the site is formatted HERE. Each formatter is built once
// (constructing one is the expensive part; calling it is cheap) and always names BOTH a locale and a time zone,
// so the server and the phone cannot disagree and React cannot report a hydration mismatch.
//
// Locale notes (checked against Node's ICU, not assumed):
//  - "en-ET" is not a locale of its own: it resolves to plain "en". That is fine for money (ETB 14,200) but it
//    gives dates as "Jul 14, 2026, 6:40 PM". Dates use "en-GB" instead: "14 Jul 2026, 18:40" (day first, 24-hour).
//  - Ethiopian calendar / dawn-based clock: Intl cannot do either. A deliberate decision, not an omission:
//    this site shows the Gregorian calendar and a 24-hour clock in Addis Ababa time.
// Money is stored as whole birr (an integer): no floating-point surprises, no "1200.5 birr".
const TZ = "Africa/Addis_Ababa"; // EAT, UTC+3, no daylight saving

export const etb = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 });

export const when = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: TZ }); // 14 Jul 2026, 18:40
export const clock = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TZ }); // 18:40
export const dayLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: TZ }); // 14 Jul
export const yearLabel = new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: TZ });

export const list = new Intl.ListFormat("en-GB", { type: "conjunction" }); // "Bole, Piassa and Kazanchis"
export const km = new Intl.NumberFormat("en", { maximumFractionDigits: 1 });
export const percent = new Intl.NumberFormat("en-ET", { style: "percent" });

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const STEPS = [["day", 86_400], ["hour", 3_600], ["minute", 60], ["second", 1]];

// "12 minutes ago", "in 3 minutes", "now". Depends on the CURRENT time, so never render it during server
// rendering and expect the browser to agree: see components/RelativeTime.jsx.
export function relative(date, now = Date.now()) {
  const seconds = Math.round((new Date(date).getTime() - now) / 1000);
  const [unit, size] = STEPS.find(([, s]) => Math.abs(seconds) >= s) ?? STEPS[3];
  return rtf.format(Math.round(seconds / size), unit);
}
