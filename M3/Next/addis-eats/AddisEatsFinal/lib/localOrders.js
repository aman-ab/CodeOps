// Browser-only helpers. After an order is placed we keep a copy in this
// browser so the confirmation page can still show it on hosts where the
// server's in-memory order list is not shared between requests (e.g. Vercel).
const KEY = "addis-eats-recent-orders-v1";

function readAll() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function rememberOrder(order) {
  try {
    const all = readAll();
    all[order.id] = order;

    // keep only the 10 newest
    const newest = Object.values(all)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    window.localStorage.setItem(
      KEY,
      JSON.stringify(Object.fromEntries(newest.map((o) => [o.id, o]))),
    );
  } catch {
    // ignore: storage is a nice-to-have
  }
}

// Returns the raw JSON text (a string is a stable value for React to compare).
export function recallOrderRaw(id) {
  try {
    const order = readAll()[id];
    return order ? JSON.stringify(order) : null;
  } catch {
    return null;
  }
}
