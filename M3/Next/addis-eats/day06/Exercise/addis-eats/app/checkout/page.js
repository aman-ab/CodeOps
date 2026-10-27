import Link from "next/link";
import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";
import { signIn, signOut } from "../actions";

export default async function CheckoutPage() {
  // THIS LINE makes the route dynamic: cookies() depends on who is asking.
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* demo sign-in so cancelOrder has someone to check */}
      {session ? (
        <form action={signOut} className="flex items-center gap-3">
          <span>Signed in as <b>{session}</b></span>
          <button className="underline">Sign out</button>
        </form>
      ) : (
        <form action={signIn} className="flex items-center gap-2">
          <input name="name" placeholder="your name (demo sign-in)" className="rounded border bg-white p-2" />
          <button className="rounded border px-3 py-2">Sign in</button>
        </form>
      )}

      <CheckoutForm />
      <Link className="block underline" href="/cart">Back to the cart</Link>
    </main>
  );
}
