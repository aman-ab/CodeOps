"use client"; // Recharts measures the DOM, so it is client code. The PAGE stays a server component.
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatETBWhole } from "../../lib/format";

// data = 4 summarised rows [{ area, revenue, orders }], never the orders themselves.
export default function RevenueChart({ data }) {
  return (
    // role="img" + a label: a screen reader gets one sentence and is pointed at the table, instead of 40 SVG nodes
    <div role="img" aria-label="Bar chart of revenue by delivery area in ETB. The same figures are in the table below.">
      {/* A NUMBER for the height: a percentage inside a parent with no height collapses to nothing.
          It also reserves the space, so nothing jumps when the chart appears. */}
      <ResponsiveContainer width="100%" height={300} initialDimension={{ width: 640, height: 300 }}>
        <BarChart data={data} margin={{ top: 24, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="area" />
          {/* bars start at ZERO, always: the length of a bar IS the value. Explicit width: ETB labels are wide. */}
          <YAxis domain={[0, "auto"]} tickFormatter={formatETBWhole} width={90} />
          <Tooltip formatter={(v) => [formatETBWhole(v), "Revenue"]} />
          <Bar dataKey="revenue" name="Revenue" fill="#92400e" isAnimationActive={false}>
            {/* the value written on each bar: readable with the colour removed, and no hue is needed to tell anything apart */}
            <LabelList dataKey="revenue" position="top" formatter={formatETBWhole} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
