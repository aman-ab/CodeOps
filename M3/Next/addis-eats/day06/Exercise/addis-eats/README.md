# Addis Eats on Next.js (Days 36–41)

See `STRATEGY.md`, `BOUNDARY.md`, `DATA.md` and `docs/`.

## Setup
```bash
npm install zod swr
npm run dev
```

## API

| Endpoint | Method | Status codes |
|---|---|---|
| `/api/dishes` (`?category=`) | GET | 200 (plain array) |
| `/api/dishes/[id]` | GET | 200, 404 |
| `/api/menu` (`?q=&page=&pageSize=`) | GET | 200 `{ items, q, page, pageSize, total, totalPages }`, 422 `{ error, fieldErrors }` |
| `/api/orders` | POST | 201, 400, 422, 500 |
| `/api/orders/[id]` | GET | 200, 404 |

Every error uses one shape: `{ "error": "...", "fieldErrors"?: { field: ["..."] } }`.

## Try it
1. Place an order at `/checkout` (sign in with any name first), then open **Track your order**. The status moves placed → preparing → on the way → delivered over ~90 s. No spinner on load; Network tab shows one `/api/orders/ord_…` request every 5 s, then none once delivered.
2. `/menu` → type "tibs" quickly. Network tab: **one** `/api/menu?q=tibs…` request after you pause 300 ms, not four. Clear the box: no request, results disappear.
3. `/browse?page=2` opened directly arrives with page 2 already rendered. Click Next/Previous: one request per click, the old list stays visible (dimmed) until the new one arrives.

## Network tab while typing (fill in from your own observation)
- Typing `t-i-b-s` without pausing: _ requests.
- Pause after `tib`, then add `s`: _ requests; the previous list stayed on screen: yes / no.
- Two components on the order page, same key: _ requests per poll.

## Build output
```
(paste npm run build output here)
```
