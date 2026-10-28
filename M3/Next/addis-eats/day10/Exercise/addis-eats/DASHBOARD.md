# The Addis Eats dashboard (Day 46)

Install: `npm install recharts` (if npm warns about a `react-is` peer dependency: `npm install react-is`).
Sign in as **Kebede** (staff, `0911000003` / `kitchen-pass-3`) and open `/dashboard`.

## Try the four states (Exercise 7)
Demo switches work when `ENABLE_STATE_DEMOS=true`. `.env` turns them on; `.env.production` turns them **off** (so a stranger cannot
make your live site throw errors). To use them against `npm run build && npm run start`, set `ENABLE_STATE_DEMOS=true` and
`SEED_DEMO_DATA=true` in `.env.local`, which overrides `.env.production`.

| State | How to see it | File |
|---|---|---|
| **Loaded** | `/dashboard`, or `/orders` as Abebe | `page.js` |
| **Loading** | `/orders?demo=slow` or `/dashboard?demo=slow` (2.5 s). Also: DevTools → Network → Slow 4G | `loading.js` (a skeleton the shape of the content) |
| **Empty** | Sign in as **Almaz** and open `/orders` (a real brand-new customer), or add `?demo=empty` | `EmptyState` |
| **Error** | `/orders?demo=error` or `/dashboard?demo=error` | `error.js` + `ErrorPanel` (what failed, a Try again button) |

`/orders/[id]` is untouched by these: the loading and error files live in a `(list)` route group, so they only cover the list.

## What was built, by exercise
| # | Where |
|---|---|
| 1 | `lib/stats.js` aggregates on the server. Only `byArea` (4 rows) and `perDay` (14 rows) reach the browser, not the 72 orders. |
| 2 | `app/dashboard/RevenueChart.jsx`: fixed `height={300}`, `YAxis` starts at 0 with `width={90}` and ETB ticks, value labelled on every bar. |
| 3 | `OrdersChart.jsx`: heading "Orders per day, 12 Oct – 25 Oct 2026", a paragraph naming the unit, days with no orders shown as 0. |
| 4 | `components/DataTable.jsx`: the same arrays as a table under each chart (caption, thead, tfoot total). |
| 5 | `components/OrderTable.jsx`: `<table>`, `<caption>`, `<thead>`, `th scope`, right-aligned `tabular-nums` totals. |
| 6 | Sort headers are links (`?sort=total&dir=asc`); `aria-sort` on the active `<th>` only. Parsed in `lib/tableQuery.js`. |
| 7 | `components/Pager.jsx` (real `<Link>`s), `lib/demo.js` (state switches), skeletons / empty / error as above. |

## Decisions you should be able to explain
- **Charts are leaves.** The page is a server component; only the two chart files carry `"use client"` (Recharts measures the DOM). The data they get is plain arrays, so it serialises.
- **Honest axes.** `domain={[0, "auto"]}` on the bar chart: a bar's length *is* its value. The line chart also starts at zero and uses whole numbers (you cannot have 2.5 orders).
- **Readable without colour.** One series, one brand colour, the value printed on every bar, plus the table. Nothing needs a hue to be understood.
- **The table is the accessible version of the chart.** The chart wrapper is `role="img"` with one sentence that points at the table.
- **Sorting and paging live in the URL**, so `/orders?sort=total&page=3` can be sent to someone, survives a refresh, works without JavaScript, and keeps the table a server component. Default values are left out of the URL (`/orders` is the default view). A junk `?sort=` or `?page=` falls back to the default instead of crashing; `?page=99` redirects to the last real page.
- **Stable sort.** Ties always fall back to newest first, so a page never repeats or skips a row between requests.
- **Addis Ababa time.** "Which day is this order on?" is answered in `Africa/Addis_Ababa` (UTC+3), not the server's time zone.
- **Cancelled orders are not counted** in either chart, and the page says so. Revenue is windowed to the same 14 days as the line.
- **Copy-paste into a spreadsheet.** Real table markup copies as rows and columns. The sort arrow is drawn with CSS `::after`, so it is not copied into the header text.
- **Narrow screens.** The table scrolls sideways inside a labelled, keyboard-focusable region (`role="region" tabindex="0"`) instead of shrinking the text.
- **Why not a grid library?** 72 rows, 6 columns, read-only, sorted on the server: the left column of the sheet's table.

## Check yourself (fill in after running it)
- [ ] Every bar chart axis starts at zero. _______
- [ ] I can read both charts with the colour removed (DevTools → Rendering → Emulate vision deficiencies → Achromatopsia). _______
- [ ] Rows crossing to the browser for the dashboard: ___ (not ___). Check: View Source, search for `Kitfo`: it is in the server-rendered table, not in a chart prop.
- [ ] Select the table, paste into a spreadsheet: rows and columns arrive intact, no arrows in the headers. _______
- [ ] I can link someone to page 3 sorted by total: `/orders?sort=total&page=3`. _______
- [ ] A brand-new customer (Almaz) sees: _______
- [ ] I forced each of loading / empty / error and it looked right. _______

## Known limits
- Orders and users live in memory and reset when the server restarts; demo orders are regenerated each time (same ones, by design).
- The dashboard reads every order to aggregate it. Fine for hundreds; with thousands, aggregate in the database (`GROUP BY`), not in JavaScript.
- Charts and tables were checked here with unit tests and server-rendered markup, not in a browser. Look at them yourself.
