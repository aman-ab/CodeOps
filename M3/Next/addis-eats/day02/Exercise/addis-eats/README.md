# Addis Eats on Next.js (Day 36–37)

See `STRATEGY.md` for the rendering strategy per route.

## Build output
Paste the output of `npm run build` here:

```
(paste here)
```

## Test notes
- Counter in the menu sidebar keeps its value when opening `/menu/kitfo`.
- `/menu/banana` → not-found.js
- To force error.js: temporarily add `throw new Error("test")` at the top of `MenuPage`.
