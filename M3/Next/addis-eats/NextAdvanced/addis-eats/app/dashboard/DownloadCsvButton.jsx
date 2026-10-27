"use client";

import { toCsv } from "../../lib/csv";

export default function DownloadCsvButton({ orders }) {
  function downloadCsv() {
    const csv = toCsv(
      orders.map((order) => ({
        Order: order.id,
        Dish: order.dishId,
        Quantity: order.quantity,
        Total: order.total,
        Status: order.status,
        Date: order.date,
      })),
    );

    const blob = new Blob([csv], {
      type: "text/csv; charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "order-history.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  return <button onClick={downloadCsv}>Download Order History CSV</button>;
}
