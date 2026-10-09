import { useContext } from "react";
import { CartContext } from "../cart/CartContext";

// Step 3 of 3: consume. A small custom hook around useContext that fails
// loudly if a component is used outside <CartProvider>.
export function useCart() {
  const cart = useContext(CartContext);
  if (cart === null) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return cart;
}
