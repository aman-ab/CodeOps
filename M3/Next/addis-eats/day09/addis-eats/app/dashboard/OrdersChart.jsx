"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="orders" name="Orders" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
