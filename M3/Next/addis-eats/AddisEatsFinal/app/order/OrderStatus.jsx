"use client";

import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import StatusBadge from "../components/StatusBadge";
import { formatETB } from "../../lib/format";

const STEPS = [
  { key: "pending", label: "Received" },
  { key: "preparing", label: "Preparing" },
  { key: "on_the_way", label: "On the way" },
  { key: "completed", label: "Delivered" },
];

export default function OrderStatus({ id, initialOrder, live = true }) {
  const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initialOrder,
    refreshInterval: live ? 5000 : 0,
    revalidateOnFocus: live,
    revalidateOnMount: live,
  });

  if (isLoading && !data) {
    return <div className="skeleton h-40 w-full" aria-busy="true" />;
  }

  if (!data) {
    return (
      <p className="alert alert-error" role="alert">
        {error ? "Could not load the order." : "Order not found."}
      </p>
    );
  }

  const currentStep = STEPS.findIndex((step) => step.key === data.status);
  const cancelled = data.status === "cancelled";

  return (
    <section aria-label="Live order status" className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Order status</h2>
        <StatusBadge status={data.status} />
      </div>

      {cancelled ? (
        <p className="mt-4 text-sm text-ink-500">This order was cancelled.</p>
      ) : (
        <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="Progress">
          {STEPS.map((step, index) => {
            const done = index <= currentStep;

            return (
              <li key={step.key} className="text-center" aria-current={index === currentStep ? "step" : undefined}>
                <div className={`h-1.5 rounded-full ${done ? "bg-brand-600" : "bg-ink-100"}`} />
                <p className={`mt-2 text-[11px] font-semibold sm:text-xs ${done ? "text-ink-900" : "text-ink-400"}`}>
                  {step.label}
                </p>
              </li>
            );
          })}
        </ol>
      )}

      <p className="mt-5 text-sm text-ink-500">
        Total: <span className="font-semibold text-ink-900">{formatETB(data.total)}</span>
      </p>
    </section>
  );
}
