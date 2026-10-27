import { getOrder, toPublicOrder } from "../../../../lib/orders";
import { jsonError } from "../../../../lib/http";

export const dynamic = "force-dynamic"; // live status: must never be prerendered or cached

// GET /api/orders/ord_800 -> 200 public order, 404 { error: "No such order" }
// DEMO shortcut: anyone with the id can read it. A real app would check the session owner here.
export async function GET(request, { params }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) return jsonError("No such order", 404);
  return Response.json(toPublicOrder(order));
}
