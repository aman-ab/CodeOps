import { NavLink } from "react-router-dom";

// NavLink passes { isActive } to `style`, so the open screen is visibly highlighted.
// (style.css is untouched, so the highlight is done with an inline style.)
const linkStyle = ({ isActive }) => ({
  margin: "0 12px",
  fontWeight: isActive ? "bold" : "normal",
  textDecoration: isActive ? "underline" : "none",
});

function Nav() {
  return (
    <nav className="header-c">
      {/* `end` on "/" — otherwise Home would count as active on every route */}
      <NavLink to="/" end style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/menu" style={linkStyle}>
        Menu
      </NavLink>
      <NavLink to="/cart" style={linkStyle}>
        Cart
      </NavLink>
      <NavLink to="/checkout" style={linkStyle}>
        Checkout
      </NavLink>
    </nav>
  );
}

export default Nav;
