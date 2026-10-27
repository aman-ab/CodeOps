"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatETB } from "../../lib/format";

const compact = (value) => (value >= 1000 ? `${value / 1000}k` : String(value));

export default function RevenueChart({ data }) {
  return (
    <div style={{ height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ece5dc" vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis tickFormatter={compact} width={44} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip formatter={(value) => formatETB(value)} />
          <Bar dataKey="revenue" name="Revenue" fill="#cf4a07" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
