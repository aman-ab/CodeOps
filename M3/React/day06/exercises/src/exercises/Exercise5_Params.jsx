import { Link, MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import LocationBar from "../shared/LocationBar";
import { dishes } from "../shared/dishes";

// Exercise 5 — menu/:id, read with useParams, every dish card linking to its own page.

function List() {
  return (
    <ul>
      {dishes.map((dish) => (
        // key = React's bookkeeping for the list; the id in the url is what the next screen reads
        <li key={dish.id}>
          <Link to={`/menu/${dish.id}`}>{dish.name}</Link> — {dish.price} ETB
        </li>
      ))}
    </ul>
  );
}

function DishDetail() {
  const { id } = useParams(); // a STRING: "12", not 12
  const dish = dishes.find((d) => String(d.id) === id);

  // a valid path with an id that does not exist still matches this route,
  // so the component has to notice (the "*" route cannot)
  if (!dish) return <p>No dish called {id}</p>;

  return (
    <div>
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p>{dish.price} ETB</p>
      <Link to="/menu">← back</Link>
    </div>
  );
}

export default function Exercise5_Params() {
  return (
    <MemoryRouter initialEntries={["/menu"]}>
      <h2>Exercise 5 · useParams</h2>
      <LocationBar />
      <p>
        Try also: <Link to="/menu/999">/menu/999</Link> (valid path, no such dish)
      </p>
      <Routes>
        <Route path="/menu" element={<List />} />
        <Route path="/menu/:id" element={<DishDetail />} />
      </Routes>
    </MemoryRouter>
  );
}
