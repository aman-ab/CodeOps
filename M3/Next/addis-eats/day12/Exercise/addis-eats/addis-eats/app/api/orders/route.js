import { revalidatePath } from "next/cache";
import { submitOrder } from "../../../lib/orderService";
import { getSession } from "../../../lib/session";
import { jsonError } from "../../../lib/http";

// POST /api/orders   (never cached)
//   201 { id, total, currency, status }
//   400 body is not valid JSON
//   401 not signed in
//   422 { error, fieldErrors }
//   500 our fault (details are logged, never sent)
export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Not signed in", 401); // before anything else is read or parsed

    let input;
    try {
      input = await request.json();
    } catch {
      return jsonError("Request body must be valid JSON", 400);
    }

    const { status, body } = await submitOrder(input, session.id); // owner = the session, never the body
    if (status === 201) revalidatePath("/orders");
    return Response.json(body, { status });
  } catch (err) {
    console.error("POST /api/orders failed:", err);
    return jsonError("Something went wrong on our side", 500);
  }
}
