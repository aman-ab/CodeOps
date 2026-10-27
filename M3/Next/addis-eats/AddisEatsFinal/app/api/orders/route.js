import { getDishesById } from "@/lib/dishes";
import { createOrder, getOrders, getOrdersForUser } from "@/lib/orders";
import { calcTotals } from "@/lib/pricing";
import { checkoutSchema, toFieldErrors } from "@/lib/schema";
import { getSession } from "@/lib/session";

// POST /api/orders  -> place an order
export async function POST(request) {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "Please sign in to place an order" }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ errors: toFieldErrors(parsed.error) }, { status: 422 });
  }

  const { customer, items } = parsed.data;

  // Merge duplicate dishes, then look every dish up on the SERVER.
  // We never trust prices sent by the browser.
  const quantities = new Map();
  for (const item of items) {
    quantities.set(item.dishId, (quantities.get(item.dishId) ?? 0) + item.quantity);
  }

  const lines = [];

  for (const [dishId, quantity] of quantities) {
    const dish = await getDishesById(dishId);

    if (!dish) {
      return Response.json(
        { errors: { items: "A dish in your cart is no longer available. Please review your cart." } },
        { status: 422 },
      );
    }

    lines.push({ dishId: dish.id, name: dish.name, price: dish.price, quantity });
  }

  const { subtotal, deliveryFee, total } = calcTotals(lines);

  const order = await createOrder({
    userId: user.id,
    customer: {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      notes: customer.notes ?? "",
    },
    items: lines,
    subtotal,
    deliveryFee,
    total,
  });

  return Response.json(order, { status: 201 });
}

// GET /api/orders -> my orders (staff see everyone's)
export async function GET() {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const orders = user.role === "staff" ? await getOrders() : await getOrdersForUser(user.id);

  return Response.json(orders);
}
