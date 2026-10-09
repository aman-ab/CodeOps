import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import LocationBar from "../shared/LocationBar";

// Exercise 1 — a router with three routes: "/", "/menu" and "*".
// These demos use <MemoryRouter> so seven routers can live on one page.
// A real app uses <BrowserRouter> exactly the same way (see the mini-project's App.jsx).

const Home = () => <p>🏠 Home</p>;
const Menu = () => <p>🍲 Menu</p>;
const NotFound = () => <p>🤷 404 — nothing lives at this address.</p>;

export default function Exercise1_BasicRoutes() {
  return (
    <MemoryRouter>
      <h2>Exercise 1 · BrowserRouter, Routes, Route</h2>
      <LocationBar />
      <p>
        <Link to="/">Home</Link> | <Link to="/menu">Menu</Link> |{" "}
        <Link to="/mistyped">A mistyped url</Link>
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<NotFound />} /> {/* without this: a blank screen */}
      </Routes>
    </MemoryRouter>
  );
}
