import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-xl font-bold text-ink-900">Addis Eats</p>
          <p className="mt-2 text-sm text-ink-500">
            Fresh Ethiopian food, delivered across Addis Ababa.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li><Link href="/dishes" className="hover:text-brand-700">Menu</Link></li>
            <li><Link href="/cart" className="hover:text-brand-700">Cart</Link></li>
            <li><Link href="/order" className="hover:text-brand-700">My orders</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Find us</p>
          <address className="mt-3 text-sm not-italic text-ink-600">
            Bole Road
            <br />
            Addis Ababa, Ethiopia
          </address>
        </div>
      </div>

      <div className="border-t border-ink-100 py-4 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} Addis Eats. All rights reserved.
      </div>
    </footer>
  );
}
