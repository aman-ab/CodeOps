import { Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import { useAuth } from "../hooks/useAuth";

// Rendered once by Layout — it is never rebuilt when the route changes.
function Header() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="header-c">
      <h1> Addis-Eats</h1>
      <CartBadge />
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
