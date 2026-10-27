# Server / client boundary — Addis Eats

| Component | Runs on | Why |
|---|---|---|
| `app/layout.js` | Server | Passes children through `Providers`; imports nothing that needs state itself. |
| `app/providers.jsx` | **Client** | Context requires state. This is the boundary for the cart. |
| `components/CartProvider.jsx` | Client (via Providers) | Holds cart state; no directive of its own, inherits from `providers.jsx`. |
| `components/Header.js`, `Footer.js` | Server | Static markup and links. |
| `components/CartCount.jsx` | **Client** | Reads cart context for the badge — smallest piece of the header that needs it. |
| `app/page.js`, `not-found.js` | Server | Static markup. |
| `app/menu/layout.js` | Server | Layout wrapper, no interactivity. |
| `app/menu/CategorySidebar.jsx` | Server | Static list; directive moved down to the counter. |
| `app/menu/LayoutCounter.jsx` | **Client** | `useState` — the only interactive part of the sidebar. |
| `app/menu/page.js` | Server (async) | Awaits dishes directly; no hook, no loading/error state. |
| `app/menu/FilterShell.jsx` | **Client** | Holds the selected category and handles clicks; receives `DishList` as children. |
| `app/menu/DishList.jsx`, `DishCard.jsx` | Server | Pure markup from data — ships no JavaScript. |
| `app/menu/AddToCartButton.jsx` | **Client** | `onClick` writing to the cart context; receives plain props only. |
| `app/menu/[id]/page.js` | Server (async) | Awaits one dish; `notFound()` for empty. |
| `app/menu/loading.js` | Server | Skeleton markup, no interactivity. |
| `app/menu/error.js` | **Client** | Required by Next.js: error boundaries must be client components because they hold state and offer a retry handler. |
| `app/cart/page.js` | Server | Heading and links only. |
| `app/cart/CartView.jsx` | **Client** | Reads cart context, remove button. |
| `app/cart/CheckoutButton.jsx` | **Client** | `useRouter` + `onClick`. |
| `app/checkout/page.js` | Server (async) | Reads the session cookie with `cookies()`. |
| `app/checkout/CheckoutForm.jsx` | **Client** | `useActionState` (pending + result) and the cart context. |
| `app/orders/CancelOrderForm.jsx` | **Client** | `useActionState` for the cancel result. |
| `app/orders/page.js` | Server | Renders the order list; passes only an id string to the client form. |
| `app/actions.js` | Server (`"use server"`) | `placeOrder`, `cancelOrder`, `signIn`, `signOut`: the only functions that cross the boundary. |
| `lib/*` | Server only | Schema, store, session, validation. `lib/areas.js` is plain data so the client form can import it without pulling in zod. |
| `app/orders/[id]/page.js` | Server (async) | Reads the order directly and passes it down as `initial`. |
| `app/orders/[id]/OrderStatus.jsx`, `OrderSummary.jsx` | **Client** | SWR hooks (polling). Two components, one key, one request. |
| `app/menu/DishSearch.jsx` | **Client** | Typed term, debounce, SWR. |
| `app/browse/page.js` | Server (async) | Renders the requested page on the server for the first paint. |
| `app/browse/PagedDishes.jsx` | **Client** | SWR + `useSearchParams` + `pushState` paging. |
| `lib/fetcher.js`, `lib/paging.js`, `lib/useDebounce.js` | Client-safe | Contain no secrets and no server-only imports. |
| `components/AuthNav.jsx` | **Client** | SWR on `/api/me` + `usePathname`; keeps the layout and static pages free of cookie reads. |
| `app/signin/page.js` | Server | Validates `next`, redirects if already signed in. |
| `app/signin/SignInForm.jsx` | **Client** | `useActionState` for the sign-in result. |
| `app/kitchen/page.js` | Server | Role check on the server. |
| `app/kitchen/KitchenCancelForm.jsx` | **Client** | `useActionState`. |
| `lib/session.js`, `lib/users.js`, `lib/password.js`, `lib/authz.js` | Server only | Secrets, hashes and checks never reach the browser. |
| `components/Analytics.jsx` | Server | Renders `next/script` only if a URL is configured. |
| `app/menu/DishCard.jsx` | Server | Optimised `next/image`; ships no JavaScript of its own (the `Image` runtime is shared). |
| `lib/publicEnv.js` | Client-safe | Only `NEXT_PUBLIC_*` values. |
| `lib/env.js`, `instrumentation.js` | Server only | Validates secrets when the server boots. |
| `components/JsonLd.jsx` | Server | Pure markup; escapes `<` in the JSON. |
| `app/menu/[id]/opengraph-image.jsx` | Server | `ImageResponse` is drawn on the server and ships no JavaScript. |
| `lib/seo.js` | Client-safe | Only reads `NEXT_PUBLIC_SITE_URL` through `publicEnv`. |
| `app/dashboard/page.js`, `app/orders/(list)/page.js` | Server (async) | Aggregate, sort and page the data; render tables. Only 4 + 14 summary rows reach the browser. |
| `app/dashboard/RevenueChart.jsx`, `OrdersChart.jsx` | **Client** | Recharts measures the DOM. Leaves only. |
| `components/OrderTable.jsx`, `DataTable.jsx`, `Pager.jsx`, `EmptyState.jsx`, `Skeletons.jsx` | Server | Read-only markup: no state, no handlers, no JavaScript shipped. |
| `components/ErrorPanel.jsx`, `app/dashboard/error.js`, `app/orders/(list)/error.js` | **Client** | Error boundaries hold a retry handler. |
| `lib/stats.js`, `lib/seed.js`, `lib/demo.js` | Server only | Aggregation, demo data, demo switches. |
| `lib/tableQuery.js`, `lib/dates.js`, `lib/format.js` | Client-safe | Pure functions. |
