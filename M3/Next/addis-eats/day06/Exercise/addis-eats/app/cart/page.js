import Link from "next/link";
import CartView from "./CartView";
import CheckoutButton from "./CheckoutButton";

// SERVER page; the interactive pieces are two client leaves.
export default function CartPage() {
  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Your cart</h1>
      <CartView />
      <Link className="block underline" href="/menu">Back to the menu</Link>
      <CheckoutButton />
    </main>
  );
}
