"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import OrderDetails from "./OrderDetails";
import { recallOrderRaw } from "../../lib/localOrders";

const subscribeNever = () => () => {};

// Shown when the server does not know the order id (for example after a
// redeploy, or when another serverless instance handled the request).
// We fall back to the copy this browser saved when the order was placed.
export default function OrderFallback({ id }) {
  const raw = useSyncExternalStore(
    subscribeNever,
    () => recallOrderRaw(id),
    () => undefined, // server render: unknown yet
  );

  if (raw === undefined) {
    return <div className="skeleton h-64 w-full" aria-busy="true" />;
  }

  if (raw === null) {
    return (
      <div className="card px-6 py-14 text-center">
        <p className="text-5xl" aria-hidden="true">🔍</p>
        <h2 className="mt-4 text-xl font-semibold">Order not found</h2>
        <p className="mt-1 text-ink-500">We could not find an order with this number.</p>
        <Link href="/order" className="btn btn-primary mt-5">
          View my orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="alert alert-info">
        This is the copy saved in your browser when you placed the order. Live status updates may not be available.
      </p>
      <OrderDetails order={JSON.parse(raw)} live={false} />
    </div>
  );
}
