import Image from "next/image";
import Link from "next/link";
import CartCount from "./CartCount";
import AuthNav from "./AuthNav";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b bg-white p-4 font-medium">
      <Link href="/" className="mr-4 flex items-center gap-2 text-lg font-bold text-amber-800">
        {/* decorative: the text beside it already says "Addis Eats", so alt is empty on purpose */}
        <Image src="/logo.svg" alt="" width={32} height={32} />
        Addis Eats
      </Link>
      <nav aria-label="Main" className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/menu">Menu</Link>
        <Link href="/browse">Browse</Link>
        <Link href="/cart">Cart<CartCount /></Link>
        <Link href="/orders">Orders</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
      <AuthNav />
    </header>
  );
}
