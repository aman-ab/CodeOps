import { Link, MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import LocationBar from "../shared/LocationBar";

// Exercise 4 — an index route for the landing page, and a "*" route for NotFound.
//
//   index          -> the parent's own path ("/"), nothing more
//   path="menu"    -> RELATIVE: parent + /menu           (correct inside a parent)
//   path="/menu"   -> ABSOLUTE: ignores the parent       (don't write this inside a parent)

function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/menu">Menu</Link> | <Link to="/oops">/oops</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default function Exercise4_IndexNotFound() {
  return (
    <MemoryRouter>
      <h2>Exercise 4 · index route and "*"</h2>
      <LocationBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<p>🏠 Landing page (index route)</p>} />
          <Route path="menu" element={<p>🍲 Menu</p>} />
          <Route path="*" element={<p>🤷 Not found — still inside the layout</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
