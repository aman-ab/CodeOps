// All "which day is this?" questions are answered in Addis Ababa time (UTC+3, no daylight saving),
// not the server's or the viewer's. A server in Frankfurt would otherwise put a 1 a.m. order on the wrong day.
const TZ = "Africa/Addis_Ababa";
const keyFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const labelFmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, day: "numeric", month: "short" });
const yearFmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, year: "numeric" });
const placedFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false,
});

export const dayKey = (d) => keyFmt.format(new Date(d)); // "2026-10-24"
export const formatDay = (d) => labelFmt.format(new Date(d)); // "24 Oct"
export const formatPlaced = (d) => placedFmt.format(new Date(d)); // "24 Oct, 14:05"

// The last n days ending today, oldest first, INCLUDING days with no orders (a line that skips
// empty days would lie about the trend). 24-hour steps are exact because Addis has no DST.
export function lastNDays(n, now = new Date()) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getTime() - (n - 1 - i) * 86_400_000);
    return { key: dayKey(d), label: formatDay(d) };
  });
}

export function rangeLabel(days, now = new Date()) {
  return `${days[0].label} – ${days[days.length - 1].label} ${yearFmt.format(now)}`;
}
