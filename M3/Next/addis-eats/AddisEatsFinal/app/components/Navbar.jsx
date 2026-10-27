"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./useCart";
import SignOutButton from "./SignOutButton";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.2 11.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.76L19.5 8H6.2" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

export default function Navbar({ user }) {
  const pathname = usePathname();
  const { count, ready } = useCart();

  // The menu is "open for" a page; navigating to another page closes it
  // automatically because the paths no longer match.
  const [openFor, setOpenFor] = useState(null);
  const open = openFor === pathname;

  const links = [
    { href: "/", label: "Home" },
    { href: "/dishes", label: "Menu" },
    user && { href: "/order", label: "My orders" },
    user?.role === "staff" && { href: "/kitchen", label: "Kitchen" },
    user?.role === "staff" && { href: "/dashboard", label: "Dashboard" },
  ].filter(Boolean);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
      isActive(href) ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-ink-100"
    }`;

  const cartBadge =
    ready && count > 0 ? (
      <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold leading-5 text-white">
        {count > 99 ? "99+" : count}
      </span>
    ) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
          <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-lg">
            🍲
          </span>
          Addis Eats
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)} aria-current={isActive(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label={ready && count > 0 ? `Cart, ${count} items` : "Cart"}
            className="relative flex size-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
          >
            <CartIcon />
            {cartBadge}
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <span className="text-sm text-ink-600">Hi, {user.name}</span>
                <SignOutButton className="btn btn-secondary btn-sm" />
              </>
            ) : (
              <Link href="/signin" className="btn btn-primary btn-sm">
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenFor(open ? null : pathname)}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-ink-100 bg-cream px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block ${linkClass(link.href)} text-base`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t border-ink-100 pt-3">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">Signed in as {user.name}</span>
                <SignOutButton className="btn btn-secondary btn-sm" />
              </div>
            ) : (
              <Link href="/signin" className="btn btn-primary btn-block">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
