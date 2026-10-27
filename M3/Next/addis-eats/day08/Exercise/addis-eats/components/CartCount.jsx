"use client"; // reads the cart context
import { useCart } from "./CartProvider";

export default function CartCount() {
  const { count } = useCart();
  return <span className="ml-1 rounded-full bg-amber-700 px-2 text-xs text-white">{count}</span>;
}
