"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const etb = (value) => {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(value);
};

export default function RevenueChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />

          <YAxis tickFormatter={etb} width={120} />

          <Tooltip formatter={etb} />

          <Bar dataKey="revenue" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
