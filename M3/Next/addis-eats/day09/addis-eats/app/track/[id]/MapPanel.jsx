"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,

  loading: () => (
    <div
      style={{
        height: "320px",
        background: "#eee",
      }}
    >
      Loading map...
    </div>
  ),
});

export default function MapPanel() {
  return <DeliveryMap />;
}
