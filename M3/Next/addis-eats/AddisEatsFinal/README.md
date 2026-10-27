# Addis Eats 🍲

Ethiopian food delivery app built with Next.js 16 (App Router), React 19, Tailwind CSS 4, SWR, Zod, Recharts and Leaflet.

## Features

- Menu with search, category filter and pagination
- Dish detail pages with reviews
- Shopping cart (saved in the browser, quantities, totals)
- Checkout with server-side validation (Zod) and cash on delivery
- Sign in with signed session cookies (customer and staff roles)
- Order history, live order status and a delivery map
- Staff-only kitchen board and dashboard (charts, table, CSV export)
- Fully responsive (phone, tablet, desktop)

## Run locally

Requires **Node.js 20.9 or newer**.

```bash
npm install
cp .env.example .env.local     # then edit it if you like
npm run dev
```

Open http://localhost:3000

Demo accounts (password `1234`): `aman@example.com` (customer) and `staff@example.com` (staff).

## Environment variables

| Variable | Required | What it does |
| --- | --- | --- |
| `SESSION_SECRET` | **Yes, in production** | Signs the login cookie. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your public URL, used for link previews, sitemap and robots.txt |
| `NEXT_PUBLIC_SHOW_DEMO_ACCOUNTS` | No | Set to `false` to hide the demo logins on the sign-in page |

In development a built-in dev secret is used. In production the app **refuses to sign anyone in** until `SESSION_SECRET` is set.

## Deploy

### Vercel (easiest)

1. Push this folder to GitHub.
2. On vercel.com choose **Add New → Project** and import the repo (settings are detected automatically).
3. Add the environment variables above, then deploy.

### Docker / any server

```bash
docker build -t addis-eats --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com .
docker run -p 3000:3000 -e SESSION_SECRET=your-long-random-secret addis-eats
```

A health check endpoint is available at `/api/health`.

## ⚠️ Before real customers use it

1. **Orders are stored in server memory** (see `lib/orders.js`). They reset when the server restarts or redeploys, and on serverless hosts like Vercel different instances do not share them. This is fine for a demo or portfolio. For real use, replace the functions in `lib/orders.js` with a database (Neon, Supabase, Turso, MongoDB...). Nothing else needs to change: every page and API route goes through that file.
2. **Users and passwords** are hard-coded in `app/data/users.js` with plain-text passwords. Move users to a database and store hashed passwords before going live, and set `NEXT_PUBLIC_SHOW_DEMO_ACCOUNTS=false`.
3. **Payments:** checkout is cash on delivery only. No online payment is connected.

## Project structure

```
app/
  api/           auth, dishes, orders and health endpoints
  components/    shared UI (navbar, cart store, dish card, checkout form...)
  cart/ checkout/ dishes/ order/ track/ kitchen/ dashboard/ signin/
  data/          sample dishes, reviews, users and seed orders
lib/             pricing, formatting, validation, sessions, order store
proxy.js         redirects signed-out visitors away from private pages
```
