# Measuring First Load JS for /menu (Exercise 7)

1. Commit the finished Day 38 work (`git commit -am "day 38 sorted"`).
2. Measure AFTER first:  `npm run build`  → copy the `/menu` row (Size, First Load JS).
3. Make the BEFORE version on a throw-away branch:
   ```
   git switch -c before-measure
   cp docs/before/useFetch.js app/menu/useFetch.js
   cp docs/before/menu-page.client.js app/menu/page.js
   npm run build
   ```
   Copy the `/menu` row again. (A client page cannot export `revalidate`, so the BEFORE page has none.)
4. `git switch main && git branch -D before-measure` (or whatever your main branch is called).
5. Paste both rows into README.md.

Prove DishList is not shipped:  `grep -r "DishList-v1" .next/static` → no output.
(Then `grep -rl "DishList-v1" .next/server` → the server output does contain it.)
