import { notFound, redirect } from "next/navigation";
import OrderDetails from "../OrderDetails";
import OrderFallback from "../OrderFallback";
import { canViewOrder, getOrderById } from "../../../lib/orders";
import { getSession } from "../../../lib/session";

export const metadata = { title: "Order details" };

export default async function OrderPage({ params, searchParams }) {
  const { id } = await params;
  const { placed } = await searchParams;

  const user = await getSession();

  if (!user) {
    redirect(`/signin?next=/order/${id}`);
  }

  const order = await getOrderById(id);

  // Someone else's order: behave exactly like "not found".
  if (order && !canViewOrder(user, order)) {
    notFound();
  }

  return (
    <div className="page max-w-3xl">
      {placed && (
        <div className="alert alert-success mb-6" role="status">
          🎉 Thank you! Your order has been placed. We are on it.
        </div>
      )}

      <h1 className="page-title">Order {id}</h1>

      <div className="mt-8">
        {order ? <OrderDetails order={order} /> : <OrderFallback id={id} />}
      </div>
    </div>
  );
}
