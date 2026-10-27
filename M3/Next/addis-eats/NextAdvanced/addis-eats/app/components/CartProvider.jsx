"use client";

import { createContext, useState, useContext } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(dish) {
    setCart((prevCart) => [...prevCart, dish]);
  }
  function removeFromCart(dishId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  }
  function clearCart() {
    setCart([]);
    }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}