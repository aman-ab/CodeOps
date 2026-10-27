import Link from "next/link";
import { redirect } from "next/navigation";
import StatusBadge from "../components/StatusBadge";
import { getOrders, getOrdersForUser } from "../../lib/orders";
import { getSession } from "../../lib/session";
import { formatETB, formatWhen } from "../../lib/format";

export const metadata = { title: "My orders" };

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/order");
  }

  const isStaff = user.role === "staff";
  const orders = isStaff ? await getOrders() : await getOrdersForUser(user.id);

  return (
    <div className="page max-w-4xl">
      <h1 className="page-title">{isStaff ? "All orders" : "My orders"}</h1>
      <p className="page-subtitle">
        {isStaff ? "Every order placed on Addis Eats." : "Your order history and live status."}
      </p>

      {orders.length === 0 ? (
        <div className="card mt-8 px-6 py-14 text-center">
          <p className="text-5xl" aria-hidden="true">🧾</p>
          <h2 className="mt-4 text-xl font-semibold">You have no orders yet</h2>
          <p className="mt-1 text-ink-500">Your orders will show up here once you place one.</p>
          <Link href="/dishes" className="btn btn-primary mt-5">
            Browse the menu
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-sans text-base font-semibold">{order.id}</h2>
                  <p className="text-sm text-ink-500">{formatWhen(order.createdAt ?? order.date)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <p className="mt-3 text-sm text-ink-600">
                {order.items.map((item) => `${item.quantity} × ${item.name}`).join(", ")}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-ink-900">{formatETB(order.total)}</p>
                <div className="flex gap-2">
                  <Link href={`/order/${order.id}`} className="btn btn-secondary btn-sm">
                    View
                  </Link>
                  <Link href={`/track/${order.id}`} className="btn btn-ghost btn-sm">
                    Track
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
