import { useContext } from "react";
import { CartContext } from "./CartContext";

// Exercise 1 — the guarded hook.
export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === null) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return ctx;
}
