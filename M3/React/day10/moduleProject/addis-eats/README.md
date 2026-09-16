# Addis Eats

The complete frontend for a food-ordering app, built to the Day 35 capstone
brief: browse a menu fetched from an API, filter by category, open a dish
on its own page, build an order, and check out through a validated,
sign-in-guarded form.

## Routes

| Screen   | Route        | What it does                              |
|----------|--------------|--------------------------------------------|
| Home     | `/`          | Welcome message, link into the menu       |
| Menu     | `/menu`      | Fetched dishes, category filter in the URL|
| Dish     | `/menu/:id`  | One dish, view details / add to cart      |
| Cart     | `/cart`      | Order lines, running ETB total, remove one / remove all |
| Checkout | `/checkout`  | Validated form, guarded by sign-in        |
| Sign in  | `/signin`    | Where the checkout guard redirects to     |
| Contact  | `/contact`   | Address, phone, email                     |

## Folder structure

Grouped by feature, not by file type:

```
src/
  api/        fetch helpers (menuApi.js)
  hooks/      useMenu -- reusable data fetching
  ui/         Modal, ErrorBoundary -- generic, no business logic
  cart/       store, CartPage, CartBadge
  menu/       Menu, CategoryBar, DishList, DishCard, DishDetail
  checkout/   Checkout, OrderForm, validate.js
  auth/       AuthContext, RequireAuth, SignIn
  pages/      Home, Contact, NotFound
  components/ Header, Footer (site chrome, not a "feature")
  constants/  contactInfo.js (shared by Header/Footer/Contact)
  App.jsx, Layout.jsx, main.jsx
```

## What's implemented against the brief

- **Composed components, props, keys, conditional rendering** — `DishList`/`DishCard`, conditional empty/error states throughout.
- **State and events; a controlled form** — `OrderForm` and `SignIn` are fully controlled, with inline per-field validation.
- **Data fetched in an effect, with cleanup** — `useMenu` (a `cancelled` flag guards against setting state after unmount).
- **A custom hook, and a store** — `useMenu` (hook) + `cartStore` (Zustand, persisted to `localStorage`).
- **Nested routes, a dynamic route, a guarded route** — `Layout` + `Outlet`, `/menu/:id`, and `RequireAuth` guarding `/checkout`.
- **Validation, an error boundary, a lazy route** — `validate.js`, `ErrorBoundary` wraps the app, most routes are `React.lazy` + `Suspense`.

## This session's specific requests

1. Plain CSS throughout — no design system, just enough to make the new pieces legible.
2. Header nav: Home, a Menu dropdown (All / Main Dish / Side Dish / Beverage), Contact, and a Cart badge that shows the live item count.
3. Home page has a welcome message.
4. Every dish card has a real "View details" link to `/menu/:id`.
5. Footer now has real copy, address, phone, and a copyright line (was placeholder text before).
6. Dark mode removed entirely — no theme context, no toggle.
7. `/cart` has a "Remove all" button that opens a confirm modal before clearing.
8. The checkout page no longer shows the cart list or a total — that's the Cart page's job now; Checkout is just the form.

## Running it

```bash
npm install
npm run dev
```
