"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./useCart";
import QuantityStepper from "./QuantityStepper";
import { CATEGORY_EMOJI, formatETB } from "../../lib/format";

function Thumb({ line }) {
  if (line.image) {
    return (
      <Image
        src={line.image}
        alt=""
        width={96}
        height={96}
        className="size-20 shrink-0 rounded-xl object-cover sm:size-24"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex size-20 shrink-0 items-center justify-center rounded-xl text-3xl sm:size-24"
      style={{ background: "linear-gradient(135deg, var(--color-gold-100), var(--color-brand-100))" }}
    >
      {CATEGORY_EMOJI[line.category] ?? "🍽️"}
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3" aria-busy="true">
      <div className="space-y-4 lg:col-span-2">
        <div className="skeleton h-32 w-full" />
        <div className="skeleton h-32 w-full" />
      </div>
      <div className="skeleton h-64 w-full" />
    </div>
  );
}

export default function CartView() {
  const { items, ready, count, subtotal, deliveryFee, total, setQuantity, removeFromCart, clearCart } =
    useCart();

  if (!ready) return <CartSkeleton />;

  if (items.length === 0) {
    return (
      <div className="card px-6 py-16 text-center">
        <p className="text-6xl" aria-hidden="true">🛒</p>
        <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-500">
          Add a few dishes from the menu and they will show up here.
        </p>
        <Link href="/dishes" className="btn btn-primary mt-6">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-3">
      <section aria-label="Items in your cart" className="lg:col-span-2">
        <ul className="space-y-4">
          {items.map((line) => (
            <li key={line.id} className="card flex gap-4 p-4">
              <Thumb line={line} />

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/dishes/${line.id}`} className="block truncate font-semibold text-ink-900 hover:text-brand-700">
                      {line.name}
                    </Link>
                    <p className="text-sm text-ink-500">{formatETB(line.price)} each</p>
                  </div>
                  <p className="whitespace-nowrap font-semibold text-ink-900">
                    {formatETB(line.price * line.quantity)}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                  <QuantityStepper
                    quantity={line.quantity}
                    name={line.name}
                    onChange={(next) => setQuantity(line.id, next)}
                  />
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.id)}
                    className="text-sm font-semibold text-ink-500 underline-offset-2 hover:text-[#b3261e] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button type="button" onClick={clearCart} className="btn btn-ghost btn-sm mt-4">
          Clear cart
        </button>
      </section>

      <aside aria-label="Order summary" className="card p-5 sm:p-6 lg:sticky lg:top-24">
        <h2 className="text-xl font-semibold">Order summary</h2>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Items ({count})</dt>
            <dd className="font-medium">{formatETB(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">Delivery</dt>
            <dd className="font-medium">{formatETB(deliveryFee)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink-100 pt-3 text-base">
            <dt className="font-semibold">Total</dt>
            <dd className="font-bold text-ink-900">{formatETB(total)}</dd>
          </div>
        </dl>

        <Link href="/checkout" className="btn btn-primary btn-block mt-6">
          Proceed to checkout
        </Link>
        <Link href="/dishes" className="btn btn-ghost btn-block mt-2">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
