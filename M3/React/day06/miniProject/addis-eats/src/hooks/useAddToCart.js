import { useCallback } from "react";
import { useCart } from "./useCart";

// One stable "add this dish" function for every screen that has an ADD button.
export function useAddToCart() {
  const { dispatch } = useCart();
  return useCallback((dish) => dispatch({ type: "add", dish }), [dispatch]);
}
