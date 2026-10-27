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
