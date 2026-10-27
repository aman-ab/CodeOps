"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="skeleton h-full w-full rounded-none" aria-busy="true" />,
});

export default function MapPanel() {
  return (
    <div className="h-72 overflow-hidden rounded-2xl ring-1 ring-ink-100 sm:h-96">
      <DeliveryMap />
    </div>
  );
}
