"use client";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// data = 14 summarised rows [{ date, label, orders }], including days with zero orders.
export default function OrdersChart({ data }) {
  return (
    <div role="img" aria-label="Line chart of orders per day over the last 14 days. The same figures are in the table below.">
      <ResponsiveContainer width="100%" height={300} initialDimension={{ width: 640, height: 300 }}>
        <LineChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" minTickGap={16} />
          {/* a line MAY start elsewhere; this one starts at zero anyway. Whole numbers only: you cannot have 2.5 orders. */}
          <YAxis domain={[0, "auto"]} allowDecimals={false} width={40} />
          <Tooltip formatter={(v) => [v, "Orders"]} />
          <Line type="monotone" dataKey="orders" name="Orders" stroke="#92400e" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
