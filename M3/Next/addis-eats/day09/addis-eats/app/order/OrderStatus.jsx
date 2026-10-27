"use client";

import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function OrderStatus({ id, initialOrder }) {
  const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initialOrder,
    refreshInterval: 5000,
  });

  if (error) {
    return <p>Could not load the order.</p>;
  }

  if (isLoading && !data) {
    return <p>Loading order...</p>;
  }

  return (
    <div>
      <h2>Live Order Status</h2>

      <p>Order: {data.id}</p>

      <p>Status: {data.status}</p>

      <p>Total: {data.total}</p>
    </div>
  );
}
