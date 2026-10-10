import { useCallback, useMemo, useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = useCallback((dish) => setItems((prev) => [...prev, dish]), []);
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, addItem, clear }), [items, addItem, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
