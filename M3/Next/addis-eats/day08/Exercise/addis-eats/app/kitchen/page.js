import { notFound, redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { isStaff } from "../../lib/authz";
import { listOrders } from "../../lib/orders";
import KitchenCancelForm from "./KitchenCancelForm";

// Exercise 7 — staff only, refused on the SERVER. The "Kitchen" link in the header is only a courtesy.
export default async function KitchenPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=%2Fkitchen");
  if (!isStaff(user)) notFound(); // a customer gets a 404, not a hidden page

  const orders = listOrders(); // all customers' orders: this is exactly why the check above matters

  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Kitchen</h1>
      {orders.length === 0 && <p>No orders.</p>}
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="space-y-1 rounded border bg-white p-3">
            <p className="font-semibold">{o.id} · {o.status.replace(/_/g, " ")} · {o.total} {o.currency}</p>
            <p className="text-sm text-stone-600">
              {o.name} · {o.phone} · {o.area} · {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
            </p>
            {o.status !== "cancelled" && <KitchenCancelForm orderId={o.id} />}
          </li>
        ))}
      </ul>
    </main>
  );
}
