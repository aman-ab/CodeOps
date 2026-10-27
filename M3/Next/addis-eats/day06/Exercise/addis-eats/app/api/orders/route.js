import { revalidatePath } from "next/cache";
import { submitOrder } from "../../../lib/orderService";
import { getSession } from "../../../lib/session";
import { jsonError } from "../../../lib/http";

// POST /api/orders
//   201 { id, total, currency, status }
//   400 body is not valid JSON
//   422 { error, fieldErrors } validation failed
//   500 our fault (details are logged, never sent)
// POST is never cached.
export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return jsonError("Request body must be valid JSON", 400);
  }

  try {
    const session = await getSession();
    const { status, body } = await submitOrder(input, session?.id ?? null);
    if (status === 201) revalidatePath("/orders"); // an outside caller wrote data: refresh the cached page
    return Response.json(body, { status });
  } catch (err) {
    console.error("POST /api/orders failed:", err); // stack trace stays on the server
    return jsonError("Something went wrong on our side", 500);
  }
}
