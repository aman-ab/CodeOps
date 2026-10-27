import { listOrders } from "../../lib/orders";
import Link from "next/link";
import CancelOrderForm from "./CancelOrderForm";

// STATIC page (no cookies/searchParams). It only shows new orders because the order
// code calls revalidatePath("/orders") after every successful write.
export default function OrdersPage() {
  const orders = listOrders();

  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Orders</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="space-y-1 rounded border bg-white p-3">
            <p className="font-semibold">
              {o.id} · {o.total} {o.currency} · <span className="uppercase">{o.cancelled ? "cancelled" : "active"}</span>
            </p>
            <p className="text-sm text-stone-600">
              {o.name} · {o.area} · {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
            </p>
            <p className="text-xs text-stone-500">placed by: {o.userId ?? "guest"}</p>
            <Link className="text-sm underline" href={`/orders/${o.id}`}>Track order →</Link>
            {!o.cancelled && <CancelOrderForm orderId={o.id} />}
          </li>
        ))}
      </ul>
    </main>
  );
}
