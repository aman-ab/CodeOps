"use client"; // SWR hooks
import { useOrder } from "./useOrder";

const STEPS = [
  ["placed", "Order placed"],
  ["preparing", "Preparing"],
  ["on_the_way", "On the way"],
  ["delivered", "Delivered"],
];

export default function OrderStatus({ id, initial }) {
  const { data: order, error, isValidating } = useOrder(id, initial);
  if (!order) return null;

  if (order.status === "cancelled") {
    return <p className="rounded border border-red-300 bg-red-50 p-3 font-semibold text-red-700">This order was cancelled.</p>;
  }

  const current = STEPS.findIndex(([key]) => key === order.status);

  return (
    <section className="space-y-2">
      <ol className="flex gap-2">
        {STEPS.map(([key, label], i) => (
          <li
            key={key}
            className={`rounded px-3 py-1 text-sm ${i <= current ? "bg-green-700 text-white" : "bg-stone-200 text-stone-600"}`}
          >
            {label}
          </li>
        ))}
      </ol>
      <p className="text-xs text-stone-500">
        {error
          ? error.status === 401
          ? "You were signed out — sign in again to keep tracking."
          : "Connection problem — showing the last known status."
          : isValidating
          ? "Updating…"
          : current === STEPS.length - 1
          ? "Delivered — no more updates."
          : "Live — refreshes every 5 seconds."}
      </p>
    </section>
  );
}
