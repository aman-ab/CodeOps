# Addis Eats on Next.js (Days 36–42)

See `STRATEGY.md`, `BOUNDARY.md`, `DATA.md`, **`AUTH.md`** and `docs/`.

## Setup
```bash
npm install zod swr jose
cp .env.example .env.local        # then put a real value in SESSION_SECRET:  openssl rand -base64 32
npm run dev
```
Confirm `.env.local` is ignored by git (`create-next-app` adds `.env*` to `.gitignore`).

## Demo accounts (fixtures only)
| Name | Phone | Password | Role |
|---|---|---|---|
| Abebe | 0911000001 | `abebe-pass-1` | customer |
| Almaz | 0911000002 | `almaz-pass-2` | customer |
| Kebede | 0911000003 | `kitchen-pass-3` | staff |

## API (sign-in is required for everything about orders)
| Endpoint | Method | Status codes |
|---|---|---|
| `/api/dishes`, `/api/dishes/[id]`, `/api/menu` | GET | public: 200, 404, 422 |
| `/api/me` | GET | 200 `{ user }` (user is `null` when signed out) |
| `/api/orders` | POST | 201, 400, **401**, 422, 500 |
| `/api/orders/[id]` | GET | 200, **401**, **403**, 404 |

Sign-in itself is a server action (`signIn` in `app/actions.js`), so use the browser. To test the API with curl,
sign in, copy the `session` cookie value from DevTools → Application → Cookies, then:
```bash
curl -i localhost:3000/api/orders/ord_800                                   # 401
curl -i localhost:3000/api/orders/ord_800 -H "Cookie: session=<token>"      # 200 / 403 / 404
curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -H "Cookie: session=<token>" \
  -d '{"name":"Abebe Kebede","phone":"0911223344","area":"Bole","items":[{"id":"kitfo","qty":1}]}'
```

## Try it
1. Visit `/checkout` signed out → redirected to `/signin?next=%2Fcheckout` → sign in → back at `/checkout`.
2. Sign in as Almaz: `/kitchen` is a 404. Sign in as Kebede: the Kitchen link appears and `/kitchen` works.
3. Run the three attacks in `AUTH.md` and record what happened.

## Build output
```
(paste npm run build output here — /, /menu and /menu/[id] should still be static)
```
