import Link from "next/link";
import "./globals.css";

export const metadata = { title: "Addis Eats", description: "Ethiopian food, delivered." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-amber-50 text-stone-900">
        <nav className="flex gap-4 border-b bg-white p-4 font-medium">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
        <div className="p-6">{children}</div>
      </body>
    </html>
  );
}
