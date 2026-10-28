# Client-side data — queries, keys, refresh rules

All queries use the shared `lib/fetcher.js` (throws `FetchError` on any non-OK response, so SWR never caches an error body as data).

| Query | Key | Refresh rule | Why |
|---|---|---|---|
| Order status — **superseded on Day 47**: now a server-sent-event stream (`useOrderStream`); this SWR poll (same key) is only the FALLBACK when the stream cannot connect | `/api/orders/${id}` | `refreshInterval`: 5000 ms while the order is active, **0** once it is `delivered` or `cancelled`. `fallbackData` = the order the server already rendered. Focus/reconnect revalidation left on. | Status changes in minutes, so 5 s feels live without hammering the server; polling a finished order is pure waste; the server's copy removes the spinner. |
| Dish search (`DishSearch`) | `/api/menu?q=<term>&page=1&pageSize=6`, or **`null`** when the term is empty | No polling. Debounced 300 ms. `keepPreviousData: true`. Default `dedupingInterval` (2 s). | The menu changes a few times a day, so a search result never needs a timer. The null key avoids searching for nothing; debouncing means one request per pause; keepPreviousData stops the list flashing empty. |
| Paged dishes (`PagedDishes`) | `/api/menu?page=<n>&pageSize=4` | No polling. `keepPreviousData: true`. `fallbackData` **only for the key the server rendered**. | Pages are cheap to refetch on focus and never need a timer. The page number lives in the URL (`/browse?page=2`) so it is linkable and shareable. |

## Things that bite
- `fallbackData` is returned for *whatever* key is current if there is no cache for it. Passing page 1's data for every key would show page 1 while page 2 loads, so it is only supplied when `key === initialKey`.
- With `keepPreviousData`, SWR returns the previous data even when the key becomes `null`. `DishSearch` therefore only renders results while the debounced term is non-empty.
- `fetch` does not reject on 404/500. Without the throwing fetcher, `error` would never be set.
- SWR has no `staleTime`. The nearest equivalents are `dedupingInterval` (ignore duplicate calls in a window) and `revalidateIfStale` / `revalidateOnFocus` (when to refetch). No custom values are set here: defaults are fine for this data.
- Same key = same cache entry. `OrderStatus` and `OrderSummary` both call `useOrder(id)`: one request per poll, not two.
