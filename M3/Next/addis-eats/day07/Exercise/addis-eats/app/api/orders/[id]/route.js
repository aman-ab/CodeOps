import { getOrder, toPublicOrder } from "../../../../lib/orders";
import { getSession } from "../../../../lib/session";
import { canViewOrder } from "../../../../lib/authz";
import { jsonError } from "../../../../lib/http";

export const dynamic = "force-dynamic"; // live status, and it depends on who is asking

// GET /api/orders/ord_800
//   200 public order · 401 not signed in (signing in would fix it) · 403 not yours (it would not) · 404 no such order
export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return jsonError("Not signed in", 401);

  const { id } = await params;
  const order = getOrder(id);
  if (!order) return jsonError("No such order", 404);
  if (!canViewOrder(session, order)) return jsonError("Not yours", 403);

  return Response.json(toPublicOrder(order));
}
