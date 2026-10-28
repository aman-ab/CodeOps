"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { submitOrder } from "../lib/orderService";
import { getSession, setSessionCookie, clearSessionCookie } from "../lib/session";
import { getOrder, markCancelled } from "../lib/orders";
import { findUserByPhone } from "../lib/users";
import { verifyPassword, DUMMY_HASH } from "../lib/password";
import { safeNext } from "../lib/safeNext";
import { isStaff } from "../lib/authz";

// ---- sign in / out (Exercises 2, 4, 5) ----
export async function signIn(prevState, formData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/")); // a hidden input is still user input

  if (!phone || !password) return { error: "Enter your phone number and password", phone };

  const user = findUserByPhone(phone);
  const ok = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) return { error: "Phone number or password is incorrect", phone }; // same message either way

  await setSessionCookie(user.id); // a brand-new token on every sign-in
  redirect(next); // redirect() throws on purpose, so it must stay outside any try/catch
}

export async function signOut() {
  await clearSessionCookie();
  redirect("/");
}

// ---- orders ----
export async function placeOrder(prevState, formData) {
  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    area: String(formData.get("area") ?? ""),
  };

  const session = await getSession(); // 401: the check lives HERE, not in the page that renders the form
  if (!session) return { ok: false, error: "Please sign in to place an order", values };

  let items;
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    items = [];
  }

  const { status, body } = await submitOrder({ ...values, items }, session.id);
  if (status !== 201) return { ok: false, ...body, values };

  revalidatePath("/orders");
  return { ok: true, order: body };
}

export async function cancelOrder(prevState, formData) {
  const session = await getSession(); // authentication: who is asking?
  if (!session) return { ok: false, error: "Not signed in" }; // 401

  const orderId = String(formData.get("orderId") ?? ""); // only a lookup key — never trusted as ownership
  const order = getOrder(orderId);
  if (!order) return { ok: false, error: "No such order" };

  if (order.userId !== session.id) return { ok: false, error: "Not yours" }; // authorisation: 403
  if (order.status === "cancelled") return { ok: false, error: "Already cancelled" };
  if (order.status === "on_the_way" || order.status === "delivered") return { ok: false, error: "Too late to cancel" };

  markCancelled(orderId);
  revalidatePath("/orders");
  return { ok: true };
}

// ---- staff only (Exercise 7): the role is checked where the effect happens ----
export async function kitchenCancelOrder(prevState, formData) {
  const session = await getSession();
  if (!session) return { ok: false, error: "Not signed in" }; // 401
  if (!isStaff(session)) return { ok: false, error: "Not allowed" }; // 403 — hiding the link is NOT this check

  const orderId = String(formData.get("orderId") ?? "");
  const order = getOrder(orderId);
  if (!order) return { ok: false, error: "No such order" };
  if (order.status === "cancelled") return { ok: false, error: "Already cancelled" };

  markCancelled(orderId);
  revalidatePath("/kitchen");
  revalidatePath("/orders");
  return { ok: true };
}
