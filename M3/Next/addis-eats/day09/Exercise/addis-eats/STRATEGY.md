# Rendering strategy — Addis Eats

| Route | Strategy | Build marker | Why |
|---|---|---|---|
| `/` | Static (SSG) | ○ | Story and address never change between builds. |
| `/menu` | ISR, `revalidate = 3600` | ○ | Dishes change a few times a day; an hour of staleness misleads nobody and speed matters most. |
| `/menu/[id]` | Static via `generateStaticParams` | ● | Every dish id is known at build time: one HTML file per dish. |
| `/cart` | Static shell + client state | ○ | Cart contents are private browser state, nothing to render per request on the server. |
| `/checkout` | Dynamic (SSR) | ƒ (λ in older versions) | `await cookies()` reads the session cookie, so the response depends on who is asking. |
| any unknown URL | Static | ○ (`/_not-found`) | Same page for everyone. |

Layouts: `app/layout.js` (header + footer, owns html/body) → `app/menu/layout.js` (sidebar, persists across /menu ↔ /menu/[id]).
Streaming: `DishList` sits inside `<Suspense>` so the sidebar paints before the dishes.

## Day 39 additions

| Route | Strategy | Why |
|---|---|---|
| `/orders` | Static + `revalidatePath("/orders")` | Same list for everyone; refreshed on demand after every write instead of on a timer. |
| `GET /api/dishes` | Dynamic (ƒ) | Reads `request.url` for the `?category=` filter. |
| `GET /api/dishes/[id]` | Dynamic (ƒ) | Dynamic segment with no `generateStaticParams`. |
| `POST /api/orders` | Never cached | Writes data. |

## Day 41 additions

| Route | Strategy | Why |
|---|---|---|
| `/orders/[id]` | Dynamic (`force-dynamic`) + client polling | Order status changes by the minute; the server renders the first view, SWR polls after. |
| `/browse` | Dynamic (reads `searchParams`) | `?page=N` is part of the request; a shared link arrives with that page already rendered. |
| `/menu` | Still static ISR | The search box is a client leaf and does not touch the route's rendering. |
| `GET /api/orders/[id]` | Dynamic, never cached | Live status. |
| `GET /api/menu` | Dynamic (reads `request.url`) | Search and paging parameters. |

## Day 42 changes

| Route | Strategy | Why |
|---|---|---|
| `/orders` | **Dynamic** (was static) | The list is now scoped to the signed-in user, so it depends on who is asking. |
| `/orders/[id]`, `/checkout`, `/kitchen` | Dynamic | Read the session. |
| `/signin` | Dynamic | Reads `searchParams` (`next`) and the session. |
| `GET /api/me` | Dynamic | Tells the header who is signed in. |
| `/`, `/menu`, `/menu/[id]` | **Still static** | The header does not read cookies: a client component asks `/api/me`. Reading `cookies()` in the layout would make every page dynamic. |

## Day 44 additions

| Route | Strategy | Why |
|---|---|---|
| `/sitemap.xml` | Static (built from the dish list) | Regenerated on every build; no file to forget to edit. |
| `/robots.txt` | Static | Same rules for everyone (except preview deployments, which disallow everything). |
| `/menu/[id]/opengraph-image` | Static per dish (`generateStaticParams`) | One generated preview card per dish, built ahead of time. |
| `/menu` | Still ISR | `generateMetadata` reads the same dish list the page does. |
| `/browse` | Dynamic | `generateMetadata` reads `?page=` for the title and canonical. |
