# Performance — Addis Eats (Day 43)

**Nothing below is filled in for you.** Lighthouse numbers depend on your machine, so run it and write down what you see.

## How to measure (the same way every time)
1. `git add -A && git commit -m "before day 43 stage"`, then `node scripts/stage.mjs 0` (baseline).
2. `npm run build && npm run start` — **never `npm run dev`**: it is unminified and compiles on demand.
3. Chrome → new **Incognito** window (no extensions) → open `http://localhost:3000/` → DevTools → **Lighthouse** → *Mobile*, *Performance* only.
   The mobile preset already simulates Slow 4G and a 4x CPU slowdown. Do not also throttle in the Network tab.
4. Run it **3 times** and write down the **median** LCP and CLS, plus total page weight (Network tab → bottom bar, with *Disable cache* ticked).
5. Repeat for `/menu` (the image-heavy page) — the home page alone has only one big image.
6. Move to the next stage (`node scripts/stage.mjs 1`, `2`, `3`, `4`), rebuild, and measure again. **Stage 4 is the finished project.**

**INP:** a default Lighthouse run reports **TBT** (a lab stand-in), not INP. For INP use Lighthouse's *Timespan* mode: start it, click a category filter and "Add to cart" a few times, then end it. Or use the Web Vitals extension. Note which you used.

**Third-party script (stages 3 → 4):** set `NEXT_PUBLIC_ANALYTICS_SRC` in `.env.local` to a real tag, rebuild, then compare. With it empty, stages 3 and 4 behave identically and you should say so.

## Results (fill in)
Page measured: `/` and `/menu`. Median of 3 runs, mobile preset, `npm run start`.

| Stage | Change | LCP `/` | LCP `/menu` | CLS `/` | CLS `/menu` | TBT / INP | Page weight `/menu` |
|---|---|---|---|---|---|---|---|
| 0 | Baseline: plain `<img>`, `<link>` font, plain `<script>` | | | | | | |
| 1 | `<img>` → `next/image` with width, height, sizes | | | | | | |
| 2 | `priority` on the hero | | | | | | |
| 3 | `<link>` font → `next/font` | | | | | | |
| 4 | `<script>` → `next/script` `lazyOnload` | | | | | | |

## What caused each change (write one or two sentences each, using the Network waterfall)
- **Stage 1.** What did the hero and the dish cards weigh before and after? Which `srcset` entry did the browser pick, and does that match `sizes`? _______
- **Stage 2.** Did the hero's request start earlier in the waterfall? Did LCP move? (`priority` helps LCP only if the hero *is* the LCP element: check the LCP element Lighthouse reports.) _______
- **Stage 3.** Did CLS change? Was there a request to `fonts.googleapis.com` before and not after? _______
- **Stage 4.** When did the script load relative to LCP? _______

## Questions to answer
- Which single change did most of the work for LCP? _______
- Does the page still jump as it loads? What is not reserving space? _______
- What would you fix next, and why that and not something else? _______

## Decisions already made in the code (so you can explain them)
| Decision | Why |
|---|---|
| `priority` only on the home hero | One image competes for bandwidth with nothing else. Dish cards are below the fold and lazy-load. |
| `sizes` written per layout (46vw / 35vw / 248px) | Without it the browser assumes full width and downloads the biggest file for a card a third of the screen wide. |
| `alt=""` on the logo | Decorative: the text beside it already says "Addis Eats". Dishes and hero have real descriptions. |
| Logo is SVG | Scales and costs bytes only once; `next/image` serves `.svg` as-is. |
| `next/font` on `<body>`, not `<html>` | The scaffold's `globals.css` sets `font-family` on `body`, which would override a class on `html`. |
| `Intl.NumberFormat` for ETB | No date/number library installed at all. |
| Analytics `lazyOnload`, and only when a URL is configured | A third-party tag costs bytes, a connection and a privacy decision. |
| Redirects and security headers in `next.config.mjs` | Static rules cost nothing there; middleware stays small. |
| `formats: avif + webp` | Smaller files on modern phones; the first request for each size is slower while it encodes. |
