"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { submitOrder } from "../lib/orderService";
import { getSession } from "../lib/session";
import { getOrder, markCancelled } from "../lib/orders";

// Ex 5 + 6 — replaces the fetch to /api/orders. Signature (prevState, formData) is what useActionState expects.
export async function placeOrder(prevState, formData) {
  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    area: String(formData.get("area") ?? ""),
  };

  let items;
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    items = [];
  }

  const session = await getSession();
  const { status, body } = await submitOrder({ ...values, items }, session?.id ?? null);

  if (status !== 201) return { ok: false, ...body, values }; // same { error, fieldErrors } shape, plus the typed values

  revalidatePath("/orders"); // the cached orders page is now out of date
  return { ok: true, order: body };
}

// Ex 7 — an action is a public endpoint: every check lives HERE, not in the button.
export async function cancelOrder(prevState, formData) {
  const session = await getSession(); // 1. who is asking? (from the cookie, never from the form)
  if (!session) return { ok: false, error: "Not signed in" };

  const orderId = String(formData.get("orderId") ?? ""); // user input — only a *lookup key*
  const order = getOrder(orderId);
  if (!order) return { ok: false, error: "No such order" };

  if (order.userId !== session.id) return { ok: false, error: "Not yours" }; // 2. does it belong to them?
  if (order.status === "cancelled") return { ok: false, error: "Already cancelled" };

  markCancelled(orderId); // 3. only now write
  revalidatePath("/orders");
  return { ok: true };
}

// ---- demo sign-in (NOT real auth) so cancelOrder has a session to check ----
export async function signIn(formData) {
  const id = String(formData.get("name") ?? "").trim().toLowerCase();
  if (!/^[a-z0-9_-]{2,20}$/.test(id)) return;
  (await cookies()).set("session", id, { httpOnly: true, sameSite: "lax", path: "/" });
}

export async function signOut() {
  (await cookies()).delete("session");
}
