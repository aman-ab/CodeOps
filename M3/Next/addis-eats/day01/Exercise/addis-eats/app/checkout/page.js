import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <Link className="underline" href="/cart">Back to the cart</Link>
    </main>
  );
}
