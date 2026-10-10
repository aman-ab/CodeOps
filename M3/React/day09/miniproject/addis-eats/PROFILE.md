# PROFILE.md — one render, profiled, fixed, measured again

> **How to read this file.** The *what re-renders* column is worked out from the code (React's rules).
> The **millisecond cells (`___`) are yours to fill in** from the React DevTools Profiler on your own machine —
> I could not run a browser profile while preparing this project, so no number below is invented.
> Replace every `___`, and delete the "expected" notes once you have real data.

## 1. The slow interaction

Opening a dish's **Quick view** modal on `/menu` (click *Quick view*, close it, repeat three times).

## 2. Setup (so the numbers mean something)

1. `npm run build && npm run preview` — profile a **production** build, not `npm run dev`.
   (Production disables the deliberate `?crash=` tests too.)
2. Chrome DevTools → **Performance** tab → CPU: **4× slowdown** (a laptop is far faster than your students' phones).
3. React DevTools → **Profiler** → ⚙ → tick **"Record why each component rendered while profiling"**.
4. Record → do the interaction → stop. Read the **Flamegraph**, then the **Ranked** chart.

## 3. BEFORE — the version with the state too high

To reproduce it, temporarily move the modal state **up** into `src/pages/Menu.jsx`:

```jsx
// Menu.jsx (BEFORE — do not commit this)
const [quick, setQuick] = useState(null);                       // state lives in Menu
<DishList dishes={shown} onAdd={addItem} onQuickView={setQuick} />
{quick && <Modal title={quick.name} onClose={() => setQuick(null)}>…</Modal>}
// and in Dish.jsx: <button onClick={() => onQuickView(dish)}>Quick view</button>
```

| | Result |
|---|---|
| Components that render when you open the modal (expected) | `Menu`, `DishList`, **every** `Dish`, `Modal` |
| "Why did this render?" (expected) | `Menu` — its own state changed. `DishList` and each `Dish` — **parent rendered** (nothing they use changed) |
| Commit duration, 3 recordings | ___ ms · ___ ms · ___ ms (average ___ ms) |
| Slowest component in the Ranked chart | ___ |

## 4. The cause

`quick` is only needed by the one card that shows a modal, but it lives in `Menu`, so setting it
re-renders `Menu`, and with it every `Dish` — none of which received a new prop. *Its parent re-rendered.*

## 5. The fix — structure first, memo second

Move the state **down** to the component that owns it: `Dish` keeps `const [quickView, setQuickView] = useState(false)`
(this is the code in the repository). No `React.memo`, no `useCallback`: the cheapest fix was to put the state where it is used.

## 6. AFTER

| | Result |
|---|---|
| Components that render when you open the modal (expected) | **one** `Dish` and `Modal`. `Menu` and `DishList` do not render |
| Commit duration, 3 recordings | ___ ms · ___ ms · ___ ms (average ___ ms) |
| Difference | ___ ms (___ %) |

If the difference is inside the noise (a few dishes, a fast machine) say so honestly — the render *count* still
dropped from `N + 3` to `2`, and that is the measurement that scales when the menu grows to 40 dishes.

## 7. Optimisation ledger — nothing left that I cannot justify

| Thing | Status | Reason |
|---|---|---|
| `React.memo(DishList)` | **removed** | a handful of dishes; no measurement showed a benefit |
| `useMemo` for the filtered/sorted dishes (Menu, Home) | **removed** | nothing memoised depends on a stable array any more |
| `useCallback` for `handleSelect` / `onAdd` | **removed** | nothing memoised receives them. `addItem` is a Zustand action: already one stable function |
| Zustand selectors (`useCartStore(selectCount)`) | **kept** | not a memo — it is *structure* (step 3 of the order): a component re-renders only for the value it reads |
| `useMemo` on the `AuthProvider` / `ThemeProvider` value | **kept** | a context value is compared by reference; an unmemoised object would re-render every consumer whenever the provider re-renders. Measure it: ___ |
| Modal state moved into `Dish` | **kept** | the fix above (free and permanent) |
| `lazy` for Checkout / Receipt | **kept** | split by route; verify in the build output below |

## 8. Bundle (homework: "read your bundle")

`npm run build` → the three largest files in `dist/assets/`:

| # | File | Size | Belongs in the first download? |
|---|---|---|---|
| 1 | ___ | ___ kB | ___ |
| 2 | ___ | ___ kB | ___ |
| 3 | ___ | ___ kB | ___ |

Expected: the main bundle (React, the router, Zustand) is the largest, and `Checkout-*.js` and `OrderReceipt-*.js`
appear as **separate, small** files — at this size, splitting by route saves little (the sheet's warning:
"splitting a 40 kB application achieves nothing"). Record what you actually see.
