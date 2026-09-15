import { Link } from "react-router-dom";
import CartBadge from "../cart/CartBadge";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        Addis Eats
      </Link>

      <nav className="site-nav">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/contact">Contact</Link>
        <CartBadge />
      </nav>
    </header>
  );
}

export default Header;
