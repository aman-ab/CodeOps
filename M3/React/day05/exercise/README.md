# Day 30 · Hooks Deep Dive — Exercises 1–7

Separate from Day 29 and from the mini-project. No CSS file is used (plain HTML only; Exercise 1 uses inline styles so the theme change is visible).

```
npm install
npm run dev            # all 7 exercises on one page
npm run test:reducer   # Exercise 3
```

| # | Exercise | File |
|---|---|---|
| 1 | ThemeContext read from a deeply nested component | `exercises/Exercise1_Theme.jsx` |
| 2 | `useFetch` used in two components | `exercises/Exercise2_UseFetch.jsx`, `hooks/useFetch.js` |
| 3 | `cartReducer`, tested with plain objects | `cart/cartReducer.js`, `cart/cartReducer.check.js` |
| 4 | three `useState` calls → `useReducer`, compared | `exercises/Exercise4_StateVsReducer.jsx` |
| 5 | `CartProvider` (items, dispatch, derived total) | `cart/CartProvider.jsx`, `exercises/Exercise5_CartProvider.jsx` |
| 6 | memoised provider value + explanation | `cart/CartProvider.jsx`, `exercises/Exercise6_MemoValue.jsx` |
| 7 | profile, add `React.memo` + `useCallback`, profile again | `exercises/Exercise7_Profile.jsx` |

Exercises 6 and 7 log to the browser console (StrictMode renders twice in dev — compare the *difference*).

## Review questions — short answers
1. **Context** removes prop drilling. Cost: every consumer re-renders when the value changes.
2. The state lives in the component that owns it (`useState`/`useReducer` in the provider). Context only carries it — so the provider decides when things change.
3. A reducer is pure: same state + action → same result, no mutation, no fetching, no side effects. So you can test it with plain objects and no React.
4. (a) Several values that change together. (b) The next value depends on the previous one (or logic is scattered across handlers).
5. React compares props by reference. A new function each render makes `React.memo` see a changed prop, so it never skips. `useCallback` keeps the reference stable — but with no `memo` on the child, there is nothing to skip.
6. No. A custom hook shares logic, not data: each call has its own `useState`. To share data, call the hook once in a provider and distribute it with context.
