"use client"; // reads and changes the cart context
import { useCart } from "../../components/CartProvider";

export default function CartView() {
  const { items, removeItem, total } = useCart();
  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="space-y-2">
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between rounded border bg-white p-3">
            <span>{i.name} × {i.qty} — {i.price * i.qty} birr</span>
            <button className="text-sm text-red-700 underline" onClick={() => removeItem(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="font-bold">Total: {total} birr</p>
    </div>
  );
}
