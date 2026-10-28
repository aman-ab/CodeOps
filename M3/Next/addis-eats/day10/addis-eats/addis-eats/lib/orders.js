// In-memory store (resets when the server restarts). globalThis keeps it alive across dev reloads.
// Swap for a real database later — callers only use these functions.
import { buildDemoOrders } from "./seed";

const store = (globalThis.__addisOrders ??= { orders: new Map(), next: 800, seeded: false });

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
  // createdAt / cancelled may be supplied by the demo seed; real orders never pass them (see orderService)
  const order = { cancelled: false, createdAt: new Date().toISOString(), ...data, id };
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

// Day 46 — sorted and paged on the server. The browser gets one page of rows and a count, never the whole table.
// `userId` null = every order (staff only: the caller must have checked the role).
export function queryOrders({ userId = null, sort = "date", dir = "desc", page = 1, pageSize = 10 } = {}) {
  let rows = [...store.orders.values()].map(view);
  if (userId) rows = rows.filter((o) => o.userId === userId);

  const compare = {
    date: (a, b) => a.createdAt.localeCompare(b.createdAt),
    total: (a, b) => a.total - b.total,
    area: (a, b) => a.area.localeCompare(b.area),
  }[sort];
  const sign = dir === "asc" ? 1 : -1;
  // ties always fall back to newest first, so the order is stable between requests and pages never repeat a row
  rows.sort((a, b) => sign * compare(a, b) || b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));

  return { rows: rows.slice((page - 1) * pageSize, page * pageSize), total: rows.length };
}

// Exercise 6 (Day 42) — the query takes the SESSION's user id, never an id from the request.
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

// Seed once per server process (globalThis keeps the flag across dev reloads). Must stay at the bottom:
// it uses createOrder and view, which are defined above.
if (!store.seeded) {
  store.seeded = true;
  if (process.env.SEED_DEMO_DATA === "true") for (const order of buildDemoOrders()) createOrder(order);
}
