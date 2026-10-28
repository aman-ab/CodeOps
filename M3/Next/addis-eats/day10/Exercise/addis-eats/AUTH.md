# Authentication & protection — Addis Eats

Sessions: a signed JWT (HS256, `jose`) in an `httpOnly`, `sameSite=lax`, `secure` (in production) cookie, 8-hour life.
The token carries only the user id. `getSession()` (`lib/session.js`) verifies it, then loads the user, so a
changed role or deleted user takes effect immediately. One helper, used by pages, actions and handlers.

## The layers
1. **Middleware** (`middleware.js`) — a cheap early redirect. Proves only: a cookie exists and looks like a token.
2. **Page / layout** — `getSession()` while rendering. Proves: the signature and expiry are valid, and who the user is.
3. **Action / handler** — `getSession()` again, plus an ownership or role check at the point of effect. **This is the real security.**
4. **UI** (`AuthNav`, hidden links) — tidiness only. Proves nothing.

| Route | Layer 1: middleware | Layer 2: page | Layer 3: action / handler | Stops anonymous… | Stops other customers… |
|---|---|---|---|---|---|
| `/checkout` | yes | `getSession()` → redirect | `placeOrder`: session check | yes | n/a (own cart) |
| `POST /api/orders` | no (`/api` not matched) | n/a | session → 401; owner = session id | yes | owner set from session, not body |
| `/orders` | yes | `getSession()`; query = `queryOrders({ userId: user.id, … })` | `cancelOrder`: session, then `order.userId !== session.id` → "Not yours" | yes | yes: only their orders are queried |
| `/orders/[id]` | yes | session; `canViewOrder` else 404 | n/a | yes | yes: 404 for someone else's id |
| `GET /api/orders/[id]` | no | n/a | session → 401; `canViewOrder` → 403 | yes | yes |
| `/kitchen` | yes | session; `isStaff` else 404 | `kitchenCancelOrder`: session, then `isStaff` → "Not allowed" | yes | yes (role check) |
| `/dashboard` | yes | session; `isStaff` else 404 | n/a (read-only) | yes | yes (role check) |
| `GET /api/orders/[id]/stream` | no (`/api` not matched) | n/a | session → 401; `canViewOrder` → 403; 404 — all before the stream opens | yes | yes |
| `GET /api/orders/export` | no | n/a | session → 401; `scope=all` needs `isStaff` → 403; rows scoped to the session id | yes | yes |
| `/signin` | no | redirects away if already signed in | `signIn`: `safeNext`, uniform error | n/a | n/a |
| `GET /api/me` | no | n/a | returns `{ user: null }` when signed out | n/a | n/a |

## Mistakes audit (the six from the sheet)
| Mistake | Status |
|---|---|
| Only middleware protects it | No: every page and every write re-checks. |
| Trusting an id from the client | `orderId` is only a lookup key; ownership comes from the session. Orders are listed by `session.id`. |
| Checking auth in a client component | `AuthNav` is cosmetic; no check depends on it. |
| A token in localStorage | No: httpOnly cookie. |
| Redirecting to an unchecked URL | `safeNext()` (see attack 3). |
| NEXT_PUBLIC on a secret | `SESSION_SECRET` has no prefix. Check: `grep -r "SESSION_SECRET" .next/static` prints nothing. |

## The three attacks — run them, then write down what happened
**1. Call a server action while signed out.**
Sign in, open `/orders`, cancel something with DevTools → Network open. Right-click the POST → *Copy as fetch*. Sign out.
Paste the fetch into the console and run it.
*Expected:* nothing is written; the action's response is `{ ok: false, error: "Not signed in" }`.
*Line that stops it:* `if (!session) return { ok: false, error: "Not signed in" }` in `cancelOrder`.
*Actual:* _______

**2. Another account's order id.**
Sign in as Abebe, place an order, note its id (e.g. `ord_800`). Sign out, sign in as Almaz and place an order too.
On Almaz's `/orders`, DevTools → Elements: change the hidden `orderId` input to Abebe's id, click Cancel.
Also try: `/orders/ord_800` in the address bar, and `fetch("/api/orders/ord_800")` in the console.
*Expected:* "Not yours"; page 404; API 403. Abebe's order is untouched.
*Lines that stop it:* `if (order.userId !== session.id)` in `cancelOrder`; `canViewOrder` in the page and the handler.
*Actual:* _______

**3. Open redirect via `next`.**
Open each, sign in, note where you land: `/signin?next=https://evil.example`, `/signin?next=//evil.example`, `/signin?next=/\evil.example`.
*Expected:* you land on `/` every time.
*Line that stops it:* `safeNext()` in `lib/safeNext.js`. The sheet's `startsWith("/")` alone would let `//evil.example` through.
*Actual:* _______

## Known gaps (deliberate, for a course project)
- In-memory users and orders; passwords are demo fixtures. No registration, password reset or rate limiting/lockout. Use Auth.js (or similar) for production.
- A signed JWT cannot be revoked before it expires; 8 hours is the trade-off. A database session would allow instant revocation.
- `secure: true` cookies are skipped in development: Safari does not store them over `http://localhost`.
- CSRF: server actions check the request origin, and the cookie is `sameSite=lax`. The JSON `POST /api/orders` relies on `sameSite=lax` plus a JSON content type.
