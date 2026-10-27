import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { getOrdersForUser, getOrders } from "../../lib/orders";
import { etb, when, relative } from "../../lib/format";

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/order");
  }

  let orders;

  if (user.role === "customer") {
    orders = await getOrdersForUser(user.id);
  } else {
    orders = await getOrders();
  }

  return (
    <main>
      <h1>My Orders</h1>

      {orders.length === 0 && <p>You have no orders.</p>}

      {orders.map((order) => (
        <article key={order.id}>
          <h2>{order.id}</h2>

          <p>Book: {order.bookId}</p>

          <p>Quantity: {order.quantity}</p>

          <p>Status: {order.status}</p>

          <p>Total: {etb.format(order.total)}</p>

          <p>Date: {order.date}</p>

          <p>Date: {when.format(new Date(order.date))}</p>

          <p>Relative: {relative.format(-10, "minute")}</p>
        </article>
      ))}
    </main>
  );
}
