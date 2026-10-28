import { clock, dayLabel, yearLabel } from "./format";

// All "which day is this?" questions are answered in Addis Ababa time (UTC+3, no daylight saving),
// not the server's or the viewer's. A server in Frankfurt would otherwise put a 1 a.m. order on the wrong day.
const TZ = "Africa/Addis_Ababa";
// not for display: a sortable "2026-10-24" key used to bucket orders into days
const keyFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });

export const dayKey = (d) => keyFmt.format(new Date(d)); // "2026-10-24"
export const formatDay = (d) => dayLabel.format(new Date(d)); // "24 Oct"

// The last n days ending today, oldest first, INCLUDING days with no orders (a line that skips
// empty days would lie about the trend). 24-hour steps are exact because Addis has no DST.
export function lastNDays(n, now = new Date()) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getTime() - (n - 1 - i) * 86_400_000);
    return { key: dayKey(d), label: formatDay(d) };
  });
}

export function rangeLabel(days, now = new Date()) {
  return `${days[0].label} – ${days[days.length - 1].label} ${yearLabel.format(now)}`;
}

// "2026-10-20 12:30" in Addis Ababa time: sortable, and a spreadsheet reads it as a date. Exports also carry the UTC original.
export const eatTimestamp = (d) => `${dayKey(d)} ${clock.format(new Date(d))}`;
