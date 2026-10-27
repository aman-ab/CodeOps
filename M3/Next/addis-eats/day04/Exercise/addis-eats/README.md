# Addis Eats on Next.js (Days 36–39)

See `STRATEGY.md`, `BOUNDARY.md`, and `docs/before/HOW-TO-MEASURE.md`.

## Setup
```bash
npm install zod
npm run dev
```

## API

| Endpoint | Method | Status codes |
|---|---|---|
| `/api/dishes` (`?category=Mains`) | GET | 200 |
| `/api/dishes/[id]` | GET | 200, 404 `{ "error": "No such dish" }` |
| `/api/orders` | POST | 201 `{ id, total, currency, status }`, 400 bad JSON, 422 `{ error, fieldErrors }`, 500 |

Every error uses one shape: `{ "error": "...", "fieldErrors"?: { field: ["..."] } }`.

Server actions (`app/actions.js`): `placeOrder` (replaces the fetch), `cancelOrder` (checks session + owner), `signIn` / `signOut` (demo only, not real auth).

## curl tests (run these BEFORE touching the UI)
```bash
curl -i localhost:3000/api/dishes
curl -i "localhost:3000/api/dishes?category=Vegan"
curl -i localhost:3000/api/dishes/kitfo
curl -i localhost:3000/api/dishes/banana                      # 404, not an empty 200

# invalid -> 422 with fieldErrors
curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" \
  -d '{"name":"A","phone":"123","area":"Mars","items":[]}'

# valid -> 201
curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" \
  -d '{"name":"Abebe Kebede","phone":"0911223344","area":"Bole","items":[{"id":"kitfo","qty":2}]}'

# same order signed in as "abebe" (demo cookie) so he can cancel it later
curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -H "Cookie: session=abebe" \
  -d '{"name":"Abebe Kebede","phone":"0911223344","area":"Bole","items":[{"id":"kitfo","qty":1}]}'

# bad JSON -> 400
curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{oops'
```

## Security notes
- All validation and pricing happens in `lib/orderService.js`; the client sends ids and quantities only.
- `cancelOrder` reads the session from the cookie and loads the order itself; the form's `orderId` is only a lookup key.
- The demo session cookie is unsigned and forgeable. Do not ship it.
- Secrets: `.env.local` is git-ignored; only `NEXT_PUBLIC_*` values reach the browser.
  Check: `grep -r "TELEBIRR_SECRET\|sk_" .next/static` should print nothing.
- Orders live in memory and vanish on restart; swap `lib/orders.js` for a database.

## Build output
```
(paste npm run build output here)
```
