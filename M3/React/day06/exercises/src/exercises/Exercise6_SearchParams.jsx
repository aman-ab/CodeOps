import { MemoryRouter, Route, Routes, useSearchParams } from "react-router-dom";
import LocationBar from "../shared/LocationBar";
import { dishes } from "../shared/dishes";

// Exercise 6 — the category filter in the query string, with useSearchParams.
// The demo STARTS at /menu?category=drink — like opening a shared link in a new tab.

function Menu() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";

  const shown = category === "All" ? dishes : dishes.filter((d) => d.category === category);

  return (
    <div>
      {["All", "main", "side", "drink"].map((c) => (
        <button
          key={c}
          onClick={() => (c === "All" ? setParams({}) : setParams({ category: c }))}
          style={{ fontWeight: c === category ? "bold" : "normal" }}
        >
          {c}
        </button>
      ))}
      <ul>
        {shown.map((d) => (
          <li key={d.id}>
            {d.name} ({d.category})
          </li>
        ))}
        {shown.length === 0 && <li>No dishes in “{category}”.</li>}
      </ul>
      {/* the cart would NOT go in the url: it is private and changes too often */}
    </div>
  );
}

export default function Exercise6_SearchParams() {
  return (
    <MemoryRouter initialEntries={["/menu?category=drink"]}>
      <h2>Exercise 6 · useSearchParams</h2>
      <LocationBar />
      <Routes>
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </MemoryRouter>
  );
}
