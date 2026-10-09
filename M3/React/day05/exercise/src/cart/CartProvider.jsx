import { useMemo, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialCart } from "./cartReducer";

// Exercise 5: reducer + Provider, providing items, dispatch and the derived total.
// Exercise 6: the value is wrapped in useMemo.
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  const total = state.items.reduce((sum, d) => sum + d.price, 0); // derived, not stored

  // Exercise 6 — what useMemo prevents:
  // `{ items, dispatch, total }` written inline is a NEW object on every render
  // of CartProvider. React compares context values by reference, so every
  // consumer would re-render each time, even when the cart is unchanged.
  // useMemo returns the same object until `items` or `total` really changes.
  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
