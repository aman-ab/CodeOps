"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersChart({ data }) {
  return (
    <div style={{ height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ece5dc" vertical={false} />
          <XAxis dataKey="date" tickFormatter={(date) => date.slice(5)} tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis allowDecimals={false} width={32} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            name="Orders"
            stroke="#2f7d4a"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
