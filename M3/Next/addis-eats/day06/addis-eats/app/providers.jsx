"use client";
import { CartProvider } from "./components/CartProvider";

export function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
