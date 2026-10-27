import { canViewOrder, getOrderById } from "@/lib/orders";
import { getSession } from "@/lib/session";

export async function GET(request, { params }) {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id } = await params;
  const order = await getOrderById(id);

  // Same answer for "missing" and "not yours", so ids can't be probed.
  if (!order || !canViewOrder(user, order)) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json(order);
}
