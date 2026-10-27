import { notFound } from "next/navigation";
import { getOrder, toPublicOrder } from "../../../lib/orders";
import OrderStatus from "./OrderStatus";
import OrderSummary from "./OrderSummary";

export const dynamic = "force-dynamic"; // live data: render per request

// SERVER component: reads the order directly (no HTTP hop) and hands it to the client
// components as `initial` -> SWR fallbackData -> no spinner. The client then takes over and polls.
export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  const initial = toPublicOrder(order);

  return (
    <main className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Order {id}</h1>
      <OrderStatus id={id} initial={initial} />
      <OrderSummary id={id} initial={initial} />
    </main>
  );
}
