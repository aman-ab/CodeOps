import Link from "next/link";
import { redirect } from "next/navigation";
import StatusBadge from "../components/StatusBadge";
import { getOrders } from "../../lib/orders";
import { getSession } from "../../lib/session";
import { formatETB, formatWhen } from "../../lib/format";

export const metadata = { title: "Kitchen" };

const ACTIVE = ["pending", "preparing", "on_the_way"];

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  if (user.role !== "staff") {
    return (
      <div className="page text-center">
        <p className="text-6xl" aria-hidden="true">🔒</p>
        <h1 className="page-title mt-4">Access denied</h1>
        <p className="page-subtitle mx-auto">Only staff members can access the kitchen.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back home
        </Link>
      </div>
    );
  }

  const orders = (await getOrders()).filter((order) => ACTIVE.includes(order.status));

  return (
    <div className="page">
      <h1 className="page-title">Kitchen</h1>
      <p className="page-subtitle">Welcome, {user.name}. Orders that still need attention.</p>

      {orders.length === 0 ? (
        <div className="card mt-8 px-6 py-14 text-center">
          <p className="text-5xl" aria-hidden="true">👨‍🍳</p>
          <h2 className="mt-4 text-xl font-semibold">All caught up</h2>
          <p className="mt-1 text-ink-500">There are no active orders right now.</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {orders.map((order) => (
            <li key={order.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-sans text-base font-semibold">{order.id}</h2>
                  <p className="text-sm text-ink-500">{formatWhen(order.createdAt ?? order.date)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <ul className="mt-3 space-y-1 text-sm">
                {order.items.map((item) => (
                  <li key={item.dishId}>
                    <span className="font-semibold">{item.quantity} ×</span> {item.name}
                  </li>
                ))}
              </ul>

              {order.customer?.notes && (
                <p className="alert alert-info mt-3 text-sm">Note: {order.customer.notes}</p>
              )}

              <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                <span className="text-ink-500">{order.customer?.address ?? ""}</span>
                <span className="font-semibold">{formatETB(order.total)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
