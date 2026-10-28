# Tracking a delivery (Day 47)

Install: `npm install leaflet react-leaflet` (react-leaflet 5 needs React 19; for React 18 use `react-leaflet@4`).
Place an order, then open **Track your order** (`/orders/ord_…`). The order moves through placed → preparing → on the way → delivered
in about 90 seconds, and the courier pin moves during "on the way".

**Not real:** nobody carries a GPS phone. `lib/tracking.js` *simulates* the courier from the order's age (kitchen → straight line →
delivery point). The delivery pin is the **centre of the delivery area**, because an order has an area, not a street address.
Replace `trackingFor()` with a real location feed later; the page, the stream and the map only see its output.

## What was built, by exercise
| # | Where |
|---|---|
| 1 | `MapPanel.jsx`: `dynamic(() => import("./DeliveryMap"), { ssr: false, loading })`. The placeholder is `h-80`, exactly the map's 320 px. `DeliveryMap.jsx` imports `leaflet/dist/leaflet.css` and keeps the OpenStreetMap attribution. |
| 2 | Courier and delivery pins, `fitBounds` to both (on first show and when the stage changes, not every tick), and `DeliveryDetails.jsx` repeats it all in words. |
| 3 | `app/api/orders/[id]/stream/route.js`: `data: <json>` + two newlines, `retry:`, 401/403/404 before the stream opens. |
| 4 | `useOrderStream.js`: `EventSource` seeded from the server render (`initial`), closed in the effect cleanup. |
| 5 | `ConnectionBadge.jsx` (connecting / live / reconnecting / polling fallback / delivered / cancelled, in words). The client closes on a terminal status and the server also closes the stream. |
| 6 | `lib/format.js`: `etb`, `when`, `relative` (plus `clock`, `dayLabel`, `list`, `km`), each built once. Every price, date, time and list in the app goes through it. |
| 7 | `GET /api/orders/export`, `lib/csv.js`, `ExportCsvLink.jsx` on `/orders` and `/dashboard`. |

## Decisions you should be able to explain
- **Why `ssr: false`.** Leaflet touches `window` when imported. It is not an optimisation: the build crashes without it. `next/dynamic` with `ssr: false` must live in a client component, hence `MapPanel`.
- **Latitude first.** Leaflet takes `[lat, lng]`, GeoJSON `[lng, lat]`. Everything here is a `{ lat, lng }` object so they cannot be swapped by accident.
- **Pins are `L.divIcon`s with letters ("C", "D")**, not image files: Leaflet's default marker images are the classic broken-pin bug in Next.js, and a letter does not need colour to be understood.
- **The map has a text twin.** Tiles and pins mean nothing to a screen reader, or to someone whose map never loads on 3G. The map group is `aria-describedby` the text.
- **SSE closing, both ends.** When the server closes a stream, a browser `EventSource` politely *reconnects*. So the client closes first, the moment it sees `delivered` or `cancelled`; the server closes too. A delivered order's page opens no connection at all.
- **Three failure modes, three outcomes.** Connection drops: the browser reconnects itself and the page says "Reconnecting…". The first message after a reconnect is a fresh snapshot, so a phone that missed updates catches up. The stream can never work (401/403/404, EventSource gives up): the Day 41 SWR poll takes over (`useSWR(null)` until then) and the badge says so.
- **Seeded from the server.** The page renders the order, passes it as `initial`; the stream only updates it. No spinner for data we already had.
- **`RelativeTime` renders nothing on the server.** "12 minutes ago" depends on the current time; rendered on the server it would disagree with the browser and React would report a hydration mismatch. It fills in after mount.
- **The dates.** JSON has no Date type: `createdAt` and `arrivesAt` arrive as ISO strings and are converted with `new Date(...)` at the edge. Stored in UTC, shown in Addis Ababa time, always naming locale *and* zone.
- **Locale reality check.** `"en-ET"` is not a locale of its own (Node resolves it to plain `en`), and with it `dateStyle: "medium"` prints `Jul 14, 2026, 6:40 PM`, not the sheet's `14 Jul 2026, 18:40`. Dates use `en-GB`; money keeps `en-ET` (the result is identical). Also, `Intl` puts a *non-breaking* space after "ETB": a string comparison against `"ETB 14,200"` with a normal space fails.
- **Ethiopian calendar and dawn-based clock: not supported, on purpose.** Intl cannot do either. The site shows the Gregorian calendar and a 24-hour clock in Addis time. Decide this deliberately if your users expect otherwise.
- **Money is a whole-birr integer**, shown with no decimals. `Total (ETB)` in the CSV is a bare integer so a spreadsheet can add it up.

## CSV
- Quote anything containing a comma, quote, CR or LF; double inner quotes; CRLF line ends; empty cell for `null`.
- **Formula injection.** A text cell starting with `=`, `+`, `-` or `@` is *executed* by Excel and Sheets. A customer named `=HYPERLINK("http://evil.example","click")` would run on a staff member's computer. Such cells get a leading apostrophe (OWASP's fix). Side effect: a customer called `+251 Cafe` shows as `'+251 Cafe`. Numbers are not text, so `-5` stays `-5`.
- **UTF-8 BOM** at the start of the file, or Excel shows Amharic as mojibake. (`response.text()` strips the BOM when you read it back; check the raw bytes.)
- **Built on the server and streamed** in chunks, scoped to the session (`?scope=all` is staff only), `Cache-Control: no-store`. It exports the whole history, not the one page on screen. The Blob-in-the-browser technique is right for data already on screen; an order history is not that.
- **Test data:** the demo customers include `Hana "Honey" Bekele` (quote), `Dawit, Sons & Co` (comma) and `+251 Cafe` (leading plus). They appear in the *staff* export only.
- **Reading CSV** (importing)? Use Papa Parse; do not hand-roll it.

## Try it
1. Sign in as Abebe, place an order, open the tracking page. Watch DevTools → Network → the `stream` request stays pending (type `eventsource`), and the dev server console prints `[sse] open …`.
2. Navigate away 5 times and come back. Console: every `open` has a matching `close`; Network: no pending `stream` requests left. (In development React Strict Mode opens one extra connection and closes it straight away: that is the cleanup doing its job.)
3. Throttle to Offline, then back online: the badge says *Reconnecting…*, then *Live*.
4. Sign in as Almaz and open Abebe's order (or `/api/orders/ord_…/stream`): 404 page / 403 JSON, no stream.
5. Staff (Kebede) → `/dashboard` → **Export every order (CSV)**. Open it in Excel or Sheets: 8 columns on every row, quotes and commas intact, `+251 Cafe` shown as `'+251 Cafe`.
6. Awkward-value test through the API, as a signed-in user (`curl -H "Cookie: session=<token>"`): place an order whose `name` is `Selam\nTesfaye "Sel", Jr`, then export as staff.

## Check yourself (fill in after running it)
- [ ] `npm run build` succeeds, and the page does not jump when the map appears. _______
- [ ] Open streams after navigating away five times: ___ (Network tab / server console).
- [ ] Every price and time on the tracking page, orders table, dashboard and dish pages comes from `lib/format.js` (search the project for `new Intl.`: only `lib/format.js` and the day-key in `lib/dates.js` should match). _______
- [ ] The CSV survives a comma, a quotation mark and a newline in Excel/Sheets. _______
- [ ] With the map hidden (or never loaded), I can still say where my order is and when it arrives. _______

## Known limits
- Orders live in memory and reset on restart. On serverless hosting a long-lived stream is limited by the platform's maximum duration: the browser reconnects, and the first message is a snapshot. WebSockets would be a separate service (Module 4).
- The public OpenStreetMap tile server is fine for coursework, **not** for production traffic: read its tile usage policy, and use a provider or your own tiles when you deploy.
- Everything here was verified with unit tests and server-rendered markup, not in a browser. The map and the live connection are yours to look at.
