"use client"; // useActionState + the cart context
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "../actions";
import { useCart } from "../../components/CartProvider";
import { AREAS } from "../../lib/areas";

function FieldError({ errors }) {
  return errors?.length ? <p className="text-sm text-red-700">{errors[0]}</p> : null;
}

export default function CheckoutForm() {
  const { items, total, clear } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, null);

  useEffect(() => {
    if (state?.ok) clear();
  }, [state, clear]);

  if (state?.ok) {
    return (
      <div className="rounded border border-green-300 bg-green-50 p-4">
        <p className="font-bold">Order {state.order.id} placed — {state.order.total} {state.order.currency}</p>
        <Link className="underline" href={`/orders/${state.order.id}`}>Track your order</Link>
      </div>
    );
  }

  const fe = state?.fieldErrors ?? {};
  const v = state?.values ?? {};
  const field = "w-full rounded border bg-white p-2";

  return (
    <form action={formAction} className="max-w-md space-y-3">
      {state?.error && <p className="rounded bg-red-50 p-2 text-red-700">{state.error}</p>}

      <label className="block">Name
        <input name="name" defaultValue={v.name} className={field} />
        <FieldError errors={fe.name} />
      </label>

      <label className="block">Phone
        <input name="phone" defaultValue={v.phone} placeholder="0911223344" className={field} />
        <FieldError errors={fe.phone} />
      </label>

      <label className="block">Delivery area
        <select name="area" defaultValue={v.area ?? ""} className={field}>
          <option value="" disabled>Choose…</option>
          {AREAS.map((a) => <option key={a}>{a}</option>)}
        </select>
        <FieldError errors={fe.area} />
      </label>

      {/* Only ids and quantities go to the server. Prices are looked up there. */}
      <input type="hidden" name="items" value={JSON.stringify(items.map(({ id, qty }) => ({ id, qty })))} />
      <FieldError errors={fe.items} />

      <p>Total (estimate): {total} birr</p>
      <button disabled={pending} className="rounded bg-green-700 px-4 py-2 text-white disabled:opacity-50">
        {pending ? "Sending…" : "Place order"}
      </button>
    </form>
  );
}
