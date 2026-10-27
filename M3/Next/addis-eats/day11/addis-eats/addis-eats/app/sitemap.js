import { getDishes } from "./menu/dishes";
import { absoluteUrl } from "../lib/seo";

// Built from the real dish list at build time: a dish added next month appears without anyone editing a file.
// Deliberately NOT here: /cart, /checkout, /orders, /kitchen, /signin (private or per-person), /api,
// and /browse (a paginated view of dishes that are already listed one by one below).
// No lastModified: the dish records have no timestamp, and a made-up date is worse than none.
// (Google ignores priority and changefreq; priority is kept only because the course sheet shows it.)
export default async function sitemap() {
  const dishes = await getDishes();
  return [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/menu"), priority: 0.9 },
    ...dishes.map((d) => ({ url: absoluteUrl(`/menu/${d.id}`), priority: 0.7 })),
  ];
}
