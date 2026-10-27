// Plain, deterministic formatting so the server and browser always agree
// (avoids hydration mismatches).
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatETB(value) {
  return `${number.format(value ?? 0)} ETB`;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export function formatWhen(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}

export const CATEGORY_EMOJI = {
  "Main Dish": "🍲",
  "Side Dish": "🥗",
  Beverage: "🥤",
};
