// No directive here on purpose: this file is only ever imported from app/providers.jsx
// (which is a client boundary) and from client components, so it joins the client bundle from there.
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(dish) {
    setItems((prev) =>
      prev.find((i) => i.id === dish.id)
        ? prev.map((i) => (i.id === dish.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...dish, qty: 1 }]
    );
  }
  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}
