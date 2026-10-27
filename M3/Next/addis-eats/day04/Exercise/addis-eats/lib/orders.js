// In-memory store (resets when the server restarts). globalThis keeps it alive across dev reloads.
// Swap for a real database later — callers only use these four functions.
const store = (globalThis.__addisOrders ??= { orders: new Map(), next: 800 });

export function createOrder(data) {
  const id = `ord_${store.next++}`;
  const order = { id, ...data, status: "placed", createdAt: new Date().toISOString() };
  store.orders.set(id, order);
  return order;
}

export function getOrder(id) {
  return store.orders.get(id) ?? null;
}

export function listOrders() {
  return [...store.orders.values()].reverse();
}

export function markCancelled(id) {
  const order = store.orders.get(id);
  if (order) order.status = "cancelled";
  return order;
}
