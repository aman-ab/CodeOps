import { randomUUID } from "node:crypto";
import { orders as seedOrders } from "../app/data/orders";

// ---------------------------------------------------------------------------
// ORDER STORE
//
// Orders live in server memory (seeded from app/data/orders.js).
// That is perfect for development and demos, BUT:
//   - they reset whenever the server restarts or redeploys
//   - on serverless hosts (Vercel) each instance has its own copy
// For a real launch, replace the bodies of the functions below with calls to
// a database (Neon, Supabase, Turso, MongoDB ...). Nothing else in the app
// needs to change, because every page and API route goes through this file.
// ---------------------------------------------------------------------------

const store = (globalThis.__addisEatsOrders ??= structuredClone(seedOrders));

const byNewest = (a, b) =>
  new Date(b.createdAt ?? b.date) - new Date(a.createdAt ?? a.date);

export async function getOrders() {
  return [...store].sort(byNewest);
}

export async function getOrderById(id) {
  return store.find((order) => order.id === id) ?? null;
}

export async function getOrdersForUser(userId) {
  return store.filter((order) => order.userId === userId).sort(byNewest);
}

export async function createOrder(data) {
  const createdAt = new Date().toISOString();

  const order = {
    id: `ord_${randomUUID().slice(0, 8)}`,
    status: "pending",
    createdAt,
    // YYYY-MM-DD in Addis Ababa time, used by the dashboard chart.
    date: new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Addis_Ababa",
    }).format(new Date(createdAt)),
    ...data,
  };

  store.push(order);
  return order;
}

// Can this user see this order? Customers: only their own. Staff: all.
export function canViewOrder(user, order) {
  return user.role === "staff" || order.userId === user.id;
}
