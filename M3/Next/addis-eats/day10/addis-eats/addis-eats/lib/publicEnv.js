// Only NEXT_PUBLIC_* values. Safe for server AND client code (no zod, no secrets).
// Next.js replaces these expressions TEXTUALLY at build time, so every value must be written out
// literally, name and all, right after `process.env.` Destructuring or computed lookups are undefined in the browser.
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  analyticsSrc: process.env.NEXT_PUBLIC_ANALYTICS_SRC || "",
};
