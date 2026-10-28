import { buildMetadata } from "../../../lib/seo";
import { notFound, redirect } from "next/navigation";
import { getOrder, toPublicOrder } from "../../../lib/orders";
import { getSession } from "../../../lib/session";
import { canViewOrder } from "../../../lib/authz";
import OrderStatus from "./OrderStatus";
import OrderSummary from "./OrderSummary";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata({
    title: `Order ${id}`,
    description: "Live status of your Addis Eats order.", // same for every order: nothing private is put in metadata
    path: `/orders/${id}`,
  });
}

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const user = await getSession();
  if (!user) redirect(`/signin?next=${encodeURIComponent(`/orders/${id}`)}`);

  const order = getOrder(id);
  // Someone else's order looks exactly like a missing one: no hint that the id exists.
  if (!order || !canViewOrder(user, order)) notFound();

  const initial = toPublicOrder(order);
  return (
    <main className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Order {id}</h1>
      <OrderStatus id={id} initial={initial} />
      <OrderSummary id={id} initial={initial} />
    </main>
  );
}
