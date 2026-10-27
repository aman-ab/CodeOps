import { orderSchema } from "./orderSchema";
import { errorBody } from "./http";
import { createOrder } from "./orders";
import { getDish } from "../app/menu/dishes";

// The single place where an order is validated and priced.
// Both POST /api/orders and the placeOrder action call this, so the rules cannot drift apart.
export async function submitOrder(input, userId) {
  const result = orderSchema.safeParse(input);
  if (!result.success) {
    return { status: 422, body: errorBody("Validation failed", result.error.flatten().fieldErrors) };
  }

  // Never trust a price (or even a dish) from the client: look both up here.
  const lines = [];
  const unknown = [];
  for (const { id, qty } of result.data.items) {
    const dish = await getDish(id);
    if (!dish) unknown.push(id);
    else lines.push({ id, name: dish.name, price: dish.price, qty });
  }
  if (unknown.length) {
    return { status: 422, body: errorBody("Validation failed", { items: [`Unknown dish: ${unknown.join(", ")}`] }) };
  }

  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const order = createOrder({
    userId, // null for a guest order
    name: result.data.name,
    phone: result.data.phone,
    area: result.data.area,
    items: lines,
    total,
    currency: "ETB",
  });

  return { status: 201, body: { id: order.id, total: order.total, currency: order.currency, status: order.status } };
}
