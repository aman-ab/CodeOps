# Addis-Eats · Day 30 — Week 1 mini-project (assembled)

Separate from the Day 29 project. `src/css/style.css` is an unchanged copy of Day 29's file.

## Run
```
npm install
npm run dev            # open the printed URL
npm run test:reducer   # tests cartReducer with plain objects, no React
npm run lint
```

## What each hook contributes
| Hook | Where | Contribution |
|---|---|---|
| `useState` | `Menu.jsx`, `OrderForm.jsx` | selected category, form fields |
| `useEffect` (inside `useFetch`) | `hooks/useFetch.js` | fetch + abort on cleanup |
| **`useFetch`** (custom) | `hooks/useFetch.js` | `{ data, loading, error }` in one line |
| `useReducer` | `cart/CartProvider.jsx` | every cart transition via `cartReducer` |
| `createContext` / `useContext` | `cart/CartContext.js`, `hooks/useCart.js` | badge, menu and checkout read the cart with no props |
| `useMemo` (provider) | `cart/CartProvider.jsx` | stable context value → consumers don't re-render needlessly |
| `useMemo` (menu) | `Menu.jsx` | filter + sort only when data/category change |
| `useCallback` + `React.memo` | `Menu.jsx`, `DishList.jsx` | stable `onAdd`, so DishList can skip renders |

## Structure
```
src/
  hooks/useFetch.js        custom hook (abort on cleanup)
  hooks/useCart.js         useContext wrapper
  cart/cartReducer.js      pure reducer: add, remove, clear
  cart/cartReducer.check.js
  cart/CartContext.js
  cart/CartProvider.jsx    useReducer + Provider (+ derived total)
  Menu.jsx                 hook + context + filter together
  components/              Header, CartBadge, CategoryBar, DishList, Dish, CheckoutPanel, OrderForm, Footer
```

## Notes
- `menu.json` is a static file, so `?c=<category>` is ignored by the server; the fetch still re-runs
  (and aborts the previous request) when the category changes, and the filtering is done in `useMemo`.
  With a real API, the server would filter instead.
- Total is derived from `items` on every render — never stored in the reducer.
- To see the error state: change the url in `Menu.jsx` to `nope.json`.
- `remove` deletes every copy of that dish (it filters by id), as in the reading sheet's reducer.
