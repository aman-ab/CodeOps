import { useState } from "react";
import { MemoryRouter, NavLink, Outlet, Route, Routes } from "react-router-dom";
import LocationBar from "../shared/LocationBar";

// Exercise 3 — a Layout (header, nav, Outlet, footer) with the screens nested inside.
// The header has its own state. Press "like", then change screens: it keeps its count,
// because the header is rendered by the PARENT route and is never rebuilt.

function Header() {
  const [likes, setLikes] = useState(0);
  return (
    <div>
      <strong>Addis-Eats</strong> <button onClick={() => setLikes(likes + 1)}>♥ {likes}</button>
    </div>
  );
}

const tab = ({ isActive }) => ({ marginRight: 12, fontWeight: isActive ? "bold" : "normal" });

function Layout() {
  return (
    <>
      <Header />
      <nav>
        <NavLink to="/menu" style={tab}>
          Menu
        </NavLink>
        <NavLink to="/cart" style={tab}>
          Cart
        </NavLink>
      </nav>
      <Outlet /> {/* the matched child renders here */}
      <small>© footer, rendered once</small>
    </>
  );
}

export default function Exercise3_Layout() {
  return (
    <MemoryRouter initialEntries={["/menu"]}>
      <h2>Exercise 3 · Layout and Outlet</h2>
      <LocationBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="menu" element={<p>🍲 Menu screen</p>} />
          <Route path="cart" element={<p>🛒 Cart screen</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
