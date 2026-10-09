import { useState } from "react";
import { Link, MemoryRouter, NavLink, Route, Routes } from "react-router-dom";
import LocationBar from "../shared/LocationBar";

// Exercise 2 — Link instead of anchors, NavLink for the active tab.
// The counter lives ABOVE the router. Link keeps it; the plain anchor reloads the
// whole page and resets it (that is the "Break the navigation" homework).

const tab = ({ isActive }) => ({
  marginRight: 12,
  fontWeight: isActive ? "bold" : "normal",
  textDecoration: isActive ? "underline" : "none",
});

export default function Exercise2_LinkNavLink() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Exercise 2 · Link and NavLink</h2>
      <button onClick={() => setCount(count + 1)}>State above the router: {count}</button>

      <MemoryRouter>
        <LocationBar />
        <nav>
          <NavLink to="/" end style={tab}>
            Home
          </NavLink>
          <NavLink to="/menu" style={tab}>
            Menu
          </NavLink>
          <Link to="/menu">plain Link</Link>
        </nav>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/menu" element={<p>Menu</p>} />
        </Routes>
      </MemoryRouter>

      <p>
        ⚠️ <a href="/menu">Plain anchor</a> — click it after raising the counter. The page
        reloads and the counter resets. (Your browser is now at /menu; go back to / to continue.)
      </p>
    </div>
  );
}
