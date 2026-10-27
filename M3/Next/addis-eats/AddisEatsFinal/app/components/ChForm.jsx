"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./useCart";
import { formatETB } from "../../lib/format";
import { rememberOrder } from "../../lib/localOrders";

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ChForm({ defaultName = "" }) {
  const router = useRouter();
  const { items, ready, subtotal, deliveryFee, total, clearCart } = useCart();

  const [form, setForm] = useState({ name: defaultName, phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors({});
    setFormError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((line) => ({ dishId: line.id, quantity: line.quantity })),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        window.location.href = "/signin?next=/checkout";
        return;
      }

      if (response.status === 422) {
        setErrors(data.errors ?? {});
        return;
      }

      if (!response.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      rememberOrder(data);
      setPlaced(true);
      clearCart();
      router.push(`/order/${data.id}?placed=1`);
    } catch {
      setFormError("We could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) {
    return (
      <div className="grid gap-6 lg:grid-cols-5" aria-busy="true">
        <div className="skeleton h-96 lg:col-span-3" />
        <div className="skeleton h-72 lg:col-span-2" />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="card px-6 py-16 text-center" role="status">
        <p className="text-5xl" aria-hidden="true">✅</p>
        <h2 className="mt-4 text-2xl font-semibold">Order placed!</h2>
        <p className="mt-2 text-ink-500">Taking you to your order…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card px-6 py-16 text-center">
        <p className="text-6xl" aria-hidden="true">🛒</p>
        <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-500">Add some dishes before checking out.</p>
        <Link href="/dishes" className="btn btn-primary mt-6">
          Browse the menu
        </Link>
      </div>
    );
  }

  const fieldProps = (name) => ({
    "aria-invalid": errors[`customer.${name}`] ? "true" : undefined,
    "aria-describedby": errors[`customer.${name}`] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-5">
      <section aria-label="Delivery details" className="card space-y-5 p-5 sm:p-6 lg:col-span-3">
        <h2 className="text-xl font-semibold">Delivery details</h2>

        {formError && (
          <div className="alert alert-error" role="alert">
            {formError}
          </div>
        )}
        {errors.items && (
          <div className="alert alert-error" role="alert">
            {errors.items}{" "}
            <Link href="/cart" className="font-semibold underline">
              Review cart
            </Link>
          </div>
        )}

        <Field id="name" label="Full name" error={errors["customer.name"]}>
          <input
            id="name"
            className="input"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={update("name")}
            {...fieldProps("name")}
          />
        </Field>

        <Field id="phone" label="Phone number" hint="So the driver can reach you, e.g. 0911 234 567" error={errors["customer.phone"]}>
          <input
            id="phone"
            className="input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="0911 234 567"
            value={form.phone}
            onChange={update("phone")}
            {...fieldProps("phone")}
          />
        </Field>

        <Field id="address" label="Delivery address" hint="Area, street, landmark or building" error={errors["customer.address"]}>
          <textarea
            id="address"
            className="input"
            rows={3}
            autoComplete="street-address"
            required
            placeholder="Bole, near Edna Mall, Building 12"
            value={form.address}
            onChange={update("address")}
            {...fieldProps("address")}
          />
        </Field>

        <Field id="notes" label="Notes for the kitchen (optional)" error={errors["customer.notes"]}>
          <textarea
            id="notes"
            className="input"
            rows={2}
            placeholder="Less spicy please"
            value={form.notes}
            onChange={update("notes")}
            {...fieldProps("notes")}
          />
        </Field>
      </section>

      <aside aria-label="Order summary" className="card p-5 sm:p-6 lg:sticky lg:top-24 lg:col-span-2">
        <h2 className="text-xl font-semibold">Your order</h2>

        <ul className="mt-4 divide-y divide-ink-100 text-sm">
          {items.map((line) => (
            <li key={line.id} className="flex justify-between gap-3 py-2">
              <span className="min-w-0">
                <span className="font-medium">{line.quantity} × </span>
                {line.name}
              </span>
              <span className="whitespace-nowrap">{formatETB(line.price * line.quantity)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Subtotal</dt>
            <dd>{formatETB(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">Delivery</dt>
            <dd>{formatETB(deliveryFee)}</dd>
          </div>
          <div className="flex justify-between pt-1 text-base">
            <dt className="font-semibold">Total</dt>
            <dd className="font-bold text-ink-900">{formatETB(total)}</dd>
          </div>
        </dl>

        <p className="alert alert-info mt-4 text-sm">💵 Pay with cash when your order arrives.</p>

        <button type="submit" disabled={submitting} className="btn btn-primary btn-block mt-5">
          {submitting ? "Placing order…" : `Place order · ${formatETB(total)}`}
        </button>

        <Link href="/cart" className="btn btn-ghost btn-block mt-2">
          Back to cart
        </Link>
      </aside>
    </form>
  );
}
