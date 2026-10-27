import Link from "next/link";
import CartCount from "./CartCount";
import AuthNav from "./AuthNav";

// Server component. Only the tiny CartCount badge is client code.
export default function Header() {
  return (
    <header className="flex items-center gap-4 border-b bg-white p-4 font-medium">
      <Link href="/" className="mr-4 text-lg font-bold text-amber-800">Addis Eats</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/browse">Browse</Link>
      <Link href="/cart">Cart<CartCount /></Link>
      <Link href="/orders">Orders</Link>
      <Link href="/checkout">Checkout</Link>
      <AuthNav />
    </header>
  );
}
