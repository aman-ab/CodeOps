// In-memory store (resets when the server restarts). globalThis keeps it alive across dev reloads.
// Swap for a real database later — callers only use these functions.
const store = (globalThis.__addisOrders ??= { orders: new Map(), next: 800 });

// DEMO: the kitchen "progresses" an order by age so the status screen has something to poll.
function stageFor(order) {
  if (order.cancelled) return "cancelled";
  const age = (Date.now() - Date.parse(order.createdAt)) / 1000;
  if (age < 20) return "placed";
  if (age < 45) return "preparing";
  if (age < 90) return "on_the_way";
  return "delivered";
}

const view = (order) => ({ ...order, status: stageFor(order) });

export function createOrder(data) {
  const id = `ord_${store.next++}`;
  const order = { id, ...data, cancelled: false, createdAt: new Date().toISOString() };
  store.orders.set(id, order);
  return view(order);
}

export function getOrder(id) {
  const order = store.orders.get(id);
  return order ? view(order) : null;
}

export function listOrders() {
  return [...store.orders.values()].reverse().map(view);
}

// Exercise 6 — the query takes the SESSION's user id, never an id from the request.
export function listOrdersFor(userId) {
  return [...store.orders.values()].filter((o) => o.userId === userId).reverse().map(view);
}

export function markCancelled(id) {
  const order = store.orders.get(id);
  if (order) order.cancelled = true;
  return order ? view(order) : null;
}

// What the outside world may see: no phone number, no user id.
// The server page and the API both use this, so fallbackData and polled data have the SAME shape.
export function toPublicOrder(o) {
  const { id, status, total, currency, items, area, createdAt } = o;
  return { id, status, total, currency, items, area, createdAt };
}
