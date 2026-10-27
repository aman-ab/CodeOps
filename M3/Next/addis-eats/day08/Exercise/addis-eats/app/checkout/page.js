import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  // THIS makes the route dynamic: the session depends on who is asking.
  // Layer 2 of 3: middleware already redirected signed-out visitors, but it only checked a cookie
  // existed. Here the signature and expiry are really verified.
  const user = await getSession();
  if (!user) redirect("/signin?next=%2Fcheckout");

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Signed in as <b>{user.name}</b></p>
      <CheckoutForm />
      <Link className="block underline" href="/cart">Back to the cart</Link>
    </main>
  );
}
