import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { listOrdersFor } from "../../lib/orders";
import CancelOrderForm from "./CancelOrderForm";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=%2Forders");

  // Exercise 6: the query is keyed on the SESSION's id. There is no id in the URL or the request
  // that could ask for someone else's orders.
  const orders = listOrdersFor(user.id);

  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Your orders</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="space-y-1 rounded border bg-white p-3">
            <p className="font-semibold">
              {o.id} · {o.total} {o.currency} · <span className="uppercase">{o.cancelled ? "cancelled" : "active"}</span>
            </p>
            <p className="text-sm text-stone-600">
              {o.area} · {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
            </p>
            <Link className="text-sm underline" href={`/orders/${o.id}`}>Track order →</Link>
            {!o.cancelled && <CancelOrderForm orderId={o.id} />}
          </li>
        ))}
      </ul>
    </main>
  );
}
