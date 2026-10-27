import Link from "next/link";
import { cookies } from "next/headers";

export default async function CheckoutPage() {
  // THIS LINE makes the route dynamic: cookies() depends on who is asking.
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value ?? "guest";

  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Signed in as: {session}</p>
      <Link className="underline" href="/cart">Back to the cart</Link>
    </main>
  );
}
