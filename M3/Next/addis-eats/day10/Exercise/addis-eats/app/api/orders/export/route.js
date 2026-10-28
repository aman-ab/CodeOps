import { getSession } from "../../../../lib/session";
import { isStaff } from "../../../../lib/authz";
import { queryOrders } from "../../../../lib/orders";
import { csvChunks, BOM } from "../../../../lib/csv";
import { eatTimestamp, dayKey } from "../../../../lib/dates";
import { jsonError } from "../../../../lib/http";

export const dynamic = "force-dynamic";

// GET /api/orders/export            -> your own order history
// GET /api/orders/export?scope=all  -> every customer's orders (staff only)
//   200 text/csv attachment · 401 not signed in · 403 customer asked for scope=all
//
// Built here on the server and STREAMED in chunks, not in the browser: the order history has no upper limit,
// and a hundred-thousand-row CSV built in a browser tab freezes it. Scoped by the SESSION, like the orders page.
export async function GET(request) {
  const session = await getSession();
  if (!session) return jsonError("Not signed in", 401);

  const scope = new URL(request.url).searchParams.get("scope");
  if (scope === "all" && !isStaff(session)) return jsonError("Not allowed", 403);
  const all = scope === "all";

  const { rows } = queryOrders({ userId: all ? null : session.id, sort: "date", dir: "desc", page: 1, pageSize: 1_000_000 });

  const columns = [
    { header: "Order", value: (o) => o.id },
    ...(all ? [{ header: "Customer", value: (o) => o.name }] : []),
    { header: "Placed (Addis Ababa time)", value: (o) => eatTimestamp(o.createdAt) },
    { header: "Placed (UTC)", value: (o) => o.createdAt },
    { header: "Area", value: (o) => o.area },
    { header: "Items", value: (o) => o.items.map((i) => `${i.name} x${i.qty}`).join("; ") },
    { header: "Total (ETB)", value: (o) => o.total }, // a plain integer: no "ETB", no thousands separator, so the sheet can add it up
    { header: "Status", value: (o) => o.status },
  ];

  const chunks = csvChunks(columns, rows);
  const encoder = new TextEncoder();
  let first = true;

  const body = new ReadableStream({
    pull(controller) {
      const next = chunks.next();
      if (next.done) return controller.close();
      controller.enqueue(encoder.encode((first ? BOM : "") + next.value));
      first = false;
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="addis-eats-orders${all ? "-all" : ""}-${dayKey(new Date())}.csv"`,
      "Cache-Control": "no-store", // someone's order history must never sit in a shared cache
    },
  });
}
