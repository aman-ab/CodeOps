import StatusBadge from "../components/StatusBadge";
import { formatETB, formatWhen } from "../../lib/format";

export default function OrderTable({ orders }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="border-b border-ink-100 p-5 text-left font-sans text-base font-semibold text-ink-900">
            Orders, most recent first
          </caption>

          <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">Order</th>
              <th scope="col" className="px-5 py-3 font-semibold">Items</th>
              <th scope="col" className="px-5 py-3 font-semibold">Date</th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">Total</th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ink-100">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="whitespace-nowrap px-5 py-3 font-medium">{order.id}</td>
                <td className="px-5 py-3 text-ink-600">
                  {order.items.map((item) => `${item.quantity} × ${item.name}`).join(", ")}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-ink-600">
                  {formatWhen(order.createdAt ?? order.date)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right font-medium">{formatETB(order.total)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
