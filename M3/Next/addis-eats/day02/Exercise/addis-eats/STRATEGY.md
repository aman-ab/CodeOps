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
