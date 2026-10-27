"use client";

import { toCsv } from "../../lib/csv";

export default function DownloadCsvButton({ orders }) {
  function downloadCsv() {
    const csv = toCsv(
      orders.map((order) => ({
        Order: order.id,
        Items: order.items.map((item) => `${item.quantity} x ${item.name}`).join("; "),
        Subtotal: order.subtotal,
        Delivery: order.deliveryFee,
        Total: order.total,
        Status: order.status,
        Date: order.date,
      })),
    );

    const blob = new Blob([csv], { type: "text/csv; charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "order-history.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={downloadCsv} className="btn btn-secondary btn-sm">
      ⬇ Download order history (CSV)
    </button>
  );
}
