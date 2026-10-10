import { AuthProvider } from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { useTheme } from "../context/useTheme";
import { ambo } from "../shared/dishes";

// Exercise 2 — auth and theme in their own providers, separate from the cart.
// One concern, one value, one provider. Open the console and click each button:
// only the component that reads the changed context logs a render.

function UserBadge() {
  const { user, login, logout } = useAuth();
  console.log("[split] UserBadge render");
  return (
    <p>
      User: {user ?? "signed out"}{" "}
      <button onClick={user ? logout : login}>{user ? "Sign out" : "Sign in"}</button>
    </p>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  console.log("[split] ThemeButton render");
  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}

function CartPanel() {
  const { items, addItem } = useCart();
  console.log("[split] CartPanel render");
  return (
    <p>
      Cart: {items.length} <button onClick={() => addItem(ambo)}>add Ambo</button>
    </p>
  );
}

export default function Exercise2_SplitProviders() {
  return (
    <div>
      <h2>Exercise 2 · separate providers</h2>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <UserBadge />
            <ThemeButton />
            <CartPanel />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}
