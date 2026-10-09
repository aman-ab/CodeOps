import { useMemo, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialCart } from "./cartReducer";

// Step 2 of 3: provide. State (useReducer) + Provider in one component,
// so the whole app can read the cart without any cart props.
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  // Derived on every render — never stored.
  const total = state.items.reduce((sum, d) => sum + d.price, 0);

  // Memoised value: without useMemo, `{ items, dispatch, total }` is a brand
  // new object every time CartProvider re-renders, so EVERY consumer
  // (badge, checkout, ...) would re-render even though the cart did not change.
  // `dispatch` is stable, so it is not a dependency.
  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
