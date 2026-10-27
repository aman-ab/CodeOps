"use client"; // onClick + writes to the cart context
import { useCart } from "../../components/CartProvider";

// Receives plain data only (id, name, price) — no callbacks cross the boundary.
export default function AddToCartButton({ id, name, price }) {
  const { addItem } = useCart();
  return (
    <button
      className="rounded bg-amber-700 px-3 py-1 text-sm text-white"
      onClick={() => addItem({ id, name, price })}
    >
      Add to cart
    </button>
  );
}
