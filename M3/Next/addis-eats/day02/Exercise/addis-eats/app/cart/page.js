import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default function CartPage() {
  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Your cart</h1>
      <p>Your cart is empty.</p>
      <Link className="underline" href="/menu">Back to the menu</Link>
      <div><CheckoutButton /></div>
    </main>
  );
}
