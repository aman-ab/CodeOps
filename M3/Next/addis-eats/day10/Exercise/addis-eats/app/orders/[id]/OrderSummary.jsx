import { etb } from "../../../lib/format";

export default function OrderSummary({ order }) {
  return (
    <section className="rounded border bg-white p-3">
      <h2 className="font-bold">Your order</h2>
      <ul className="text-sm">
        {order.items.map((i) => (
          <li key={i.id}>{i.name} × {i.qty}: {etb.format(i.price * i.qty)}</li>
        ))}
      </ul>
      <p className="mt-1 font-semibold">Total: {etb.format(order.total)}</p>
    </section>
  );
}
