# Metadata & SEO — Addis Eats (Day 44)

**Verify by viewing source, not by reading code.** `npm run build && npm run start`, open the page, View Source (Ctrl+U).
`node scripts/seo-check.mjs` does the same reading for every page in the sitemap and reports what is wrong.

Before anything works in production: set `NEXT_PUBLIC_SITE_URL` in `.env.production` to your real domain. I used
`https://addiseats.et` because the course sheet does; change it if that is not yours.

## What was set where
| Where | What | Exercise |
|---|---|---|
| `app/layout.js` | `metadataBase`, title `template` (`%s · Addis Eats`) and `default`, default description, `openGraph` defaults | 1 |
| `lib/seo.js` `buildMetadata()` | One helper every page calls: title, description, canonical, and the four social tags | 2 |
| Each static page | Its own title + a description written for a person (see table) | 2 |
| `app/menu/page.js` | `generateMetadata`: the dish count and names come from the data | 2 |
| `app/menu/[id]/page.js` | `generateMetadata` from the dish record (name, summary, price, category) | 3 |
| `app/opengraph-image.jpg` (+ `.alt.txt`), `public/og/default-v1.jpg` | Site-wide 1200 × 630 preview | 4 |
| `app/menu/[id]/opengraph-image.jsx` | A generated 1200 × 630 card per dish (`ImageResponse`) | 4 |
| `app/menu/[id]/page.js` + `components/JsonLd.jsx` | `MenuItem` JSON-LD from the same `dish` object the page renders | 5 |
| `app/sitemap.js` | Built from the dish list; private routes excluded | 6 |
| `app/robots.js` | Disallows `/cart`, `/checkout` (and `/orders`, `/kitchen`, `/signin`, `/api/`); points at the sitemap | 7 |

## Decisions you should be able to explain
- **Why a helper instead of `export const metadata` on each page.** A page's `openGraph` object *replaces* the layout's whole
  `openGraph` object (so `siteName`, `locale` would vanish), and `title.template` is *not* applied to `openGraph.title`.
  `buildMetadata` repeats them once, in one place.
- **Why the site-wide image exists twice** (`app/opengraph-image.jpg` and `public/og/default-v1.jpg`). Pages that set their own
  `openGraph` object do not reliably inherit the file-convention image from the root, so the helper names the public copy
  explicitly. Dish pages leave `images` out on purpose so their own generated card is used. If you redesign the image, rename it
  (`default-v2.jpg`): Telegram and others cache previews for days.
- **Canonical on pagination.** `/browse?page=2` is its own canonical. Pointing every page at page 1 would tell crawlers pages 2+ are
  duplicates. `/menu`, `/signin` and the rest canonicalise to the bare path, so `?ref=telegram` does not create a second page.
- **`/menu/` vs `/menu`.** Next.js redirects the trailing-slash URL (308), so there is one URL, not two.
- **`getDish` is wrapped in React `cache()`.** `generateMetadata`, the page and the OG image all ask for the same dish; the sheet's
  "deduped within a render" is true for `fetch`, but a plain function must opt in.
- **JSON-LD only says what the page shows.** name = the h1, description = the visible paragraph, price = the price in the card
  (`ETB 280.00` on the page, `"280.00"` + `"ETB"` in the data). `<` is escaped so a value can never close the `<script>`.
  `MenuItem` is valid schema.org, but whether Google shows a rich result for it is Google's call: run the page through the Rich
  Results Test and record what it says.
- **One `h1` per page.** `DishCard` takes `as`: `h2` inside the menu list, `h1` on the dish page. The home h1 now describes the page.
- **Sitemap leaves out `/browse`.** It is a paginated view of dishes already listed one by one. There is no `lastModified`, because
  the records have no timestamp and an invented date is worse than none. Google ignores `priority`.
- **`robots.txt` is not security.** Disallow stops crawling; it does not hide a URL and does not protect data. The session checks do
  that. On Vercel preview deployments `robots.js` disallows everything, so previews are not indexed.
- **No `twitter:*` tags and no `twitter-image`.** Telegram and WhatsApp read Open Graph. Add `twitter-image` if you care about X.

## Titles and descriptions
| Route | Title | Canonical |
|---|---|---|
| `/` | (default) Addis Eats — food delivery in Addis Ababa | `/` |
| `/menu` | Menu · Addis Eats | `/menu` |
| `/menu/[id]` | `<Dish name>` · Addis Eats | `/menu/<id>` |
| `/browse` | Browse all dishes · Addis Eats (page 2+: "…, page N") | `/browse`, `/browse?page=N` |
| `/cart`, `/checkout`, `/orders`, `/orders/[id]`, `/signin`, `/kitchen` | their own | their own path |
| any 404 | Page not found · Addis Eats | none |

Descriptions are written from facts the site actually shows (the dish list, the four delivery areas). TeleBirr is not mentioned
because the checkout does not take TeleBirr payments.

## Check yourself (fill in after running it)
- [ ] Every `og:image` in View Source is an absolute `https://…` URL. _______
- [ ] Two dish pages have two different descriptions. _______
- [ ] The sitemap lists no signed-in route. _______
- [ ] JSON-LD price = the price on the page, in ETB. _______
- [ ] Exactly one `h1` on each page, and it describes the page. _______
- [ ] A link to a dish looks worth opening in a group chat. Paste one into Telegram and note what appears (Telegram's `@WebpageBot` refreshes a cached preview). _______
- [ ] Rich Results Test on a dish page: ___ (valid / warnings / nothing detected)
- [ ] `node scripts/seo-check.mjs` output: ___ failures, ___ warnings

## Known limits
- The shipped images are placeholders and the per-dish OG card is simple shapes and text (no photo). Replace both for real use.
- This project cannot be checked from a laptop against Google or Telegram: that needs a public URL (Day 48).
- `seo-check` uses regular expressions on the HTML. It is a first pass.
