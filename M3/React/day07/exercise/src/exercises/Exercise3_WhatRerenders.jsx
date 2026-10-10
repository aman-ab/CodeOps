import { createContext, useContext, useMemo, useState } from "react";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { useTheme } from "../context/useTheme";
import { ambo } from "../shared/dishes";

// Exercise 3 — record what re-renders when you add a dish.
// 1. Open React DevTools -> Components -> ⚙ -> "Highlight updates when components render".
// 2. Click "add a dish" in each half and write down which components flash / log.

// ---- Combined: ONE context holding user + theme + cart (the thing to avoid) ----
const AppContext = createContext(null);

function CombinedProvider({ children }) {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("light");
  const user = "Amanuel";
  // memoised, so this is not about a missing useMemo: when `items` changes the object
  // changes, and EVERY consumer of AppContext re-renders.
  const value = useMemo(
    () => ({
      user,
      theme,
      items,
      addItem: (dish) => setItems((prev) => [...prev, dish]),
      toggleTheme: () => setTheme((t) => (t === "light" ? "warm" : "light")),
    }),
    [theme, items],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function CombinedUser() {
  const { user } = useContext(AppContext);
  console.log("[combined] User render");
  return <p>User: {user}</p>;
}
function CombinedTheme() {
  const { theme } = useContext(AppContext);
  console.log("[combined] Theme render");
  return <p>Theme: {theme}</p>;
}
function CombinedCart() {
  const { items, addItem } = useContext(AppContext);
  console.log("[combined] Cart render");
  return (
    <p>
      Cart: {items.length} <button onClick={() => addItem(ambo)}>add a dish</button>
    </p>
  );
}

// ---- Split: three contexts ----
function SplitUser() {
  const { user } = useAuth();
  console.log("[split] User render");
  return <p>User: {user}</p>;
}
function SplitTheme() {
  const { theme } = useTheme();
  console.log("[split] Theme render");
  return <p>Theme: {theme}</p>;
}
function SplitCart() {
  const { items, addItem } = useCart();
  console.log("[split] Cart render");
  return (
    <p>
      Cart: {items.length} <button onClick={() => addItem(ambo)}>add a dish</button>
    </p>
  );
}

export default function Exercise3_WhatRerenders() {
  return (
    <div>
      <h2>Exercise 3 · what re-renders?</h2>
      <h3>Combined context</h3>
      <CombinedProvider>
        <CombinedUser />
        <CombinedTheme />
        <CombinedCart />
      </CombinedProvider>

      <h3>Split contexts</h3>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <SplitUser />
            <SplitTheme />
            <SplitCart />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
      <p>
        Expected: combined → all three log; split → only <code>[split] Cart</code>. (Even better:
        a store with selectors, Exercise 5. StrictMode logs twice in dev — compare the difference.)
      </p>
    </div>
  );
}
