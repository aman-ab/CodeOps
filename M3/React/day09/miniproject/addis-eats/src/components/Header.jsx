import { Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../auth/useAuth";

// Rendered once by Layout. It reads only the session (context). It does NOT read
// the cart — CartBadge does — so adding a dish never re-renders the Header.
function Header() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="header-c">
      <h1> Addis-Eats</h1>
      <CartBadge />
      <p>
        <ThemeToggle />
      </p>
      {!loading && user && (
        <p>
          Signed in as {user.phone} <button onClick={logout}>Sign out</button>
        </p>
      )}
      {!loading && !user && (
        <p>
          <Link to="/login">Sign in</Link>
        </p>
      )}
    </div>
  );
}

export default Header;
