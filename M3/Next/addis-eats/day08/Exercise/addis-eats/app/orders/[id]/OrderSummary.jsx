"use client";
import { useOrder } from "./useOrder";

// A SECOND component on the same page using the SAME key as OrderStatus.
// Watch the Network tab: still one request per poll, not two.
export default function OrderSummary({ id, initial }) {
  const { data: order } = useOrder(id, initial);
  if (!order) return null;

  return (
    <section className="rounded border bg-white p-3">
      <h2 className="font-bold">Your order</h2>
      <ul className="text-sm">
        {order.items.map((i) => (
          <li key={i.id}>{i.name} × {i.qty} — {i.price * i.qty} birr</li>
        ))}
      </ul>
      <p className="mt-1 font-semibold">Total: {order.total} {order.currency} · Delivery: {order.area}</p>
    </section>
  );
}
