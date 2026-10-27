import { AREAS } from "./areas";
import { dayKey } from "./dates";

// Exercise 1 — aggregation happens HERE, on the server. Only these small summary arrays are
// handed to the chart components in the browser: 4 rows and 14 rows, not every order.
// Cancelled orders are left out of both, and the page says so.
const counted = (orders) => orders.filter((o) => !o.cancelled);

export function revenueByArea(orders, days) {
  const inWindow = new Set(days.map((d) => d.key));
  const rows = counted(orders).filter((o) => inWindow.has(dayKey(o.createdAt)));
  return AREAS.map((area) => {
    const mine = rows.filter((o) => o.area === area);
    return { area, orders: mine.length, revenue: mine.reduce((sum, o) => sum + o.total, 0) };
  });
}

export function ordersPerDay(orders, days) {
  const counts = new Map(days.map((d) => [d.key, 0]));
  for (const o of counted(orders)) {
    const key = dayKey(o.createdAt);
    if (counts.has(key)) counts.set(key, counts.get(key) + 1);
  }
  return days.map((d) => ({ date: d.key, label: d.label, orders: counts.get(d.key) }));
}
