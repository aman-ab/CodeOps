import { Link } from "react-router-dom";

// The dish name links to /menu/:id. (The whole card is not wrapped in a Link
// because it also holds a button, and a button inside a link is invalid HTML.)
function Dish({ dish, onAdd, currency = "ETB" }) {
  const { id, name, price, catagory, isspicy } = dish;
  return (
    <div className="card">
      <Link to={`/menu/${id}`}>
        <h2>{name}</h2>
      </Link>
      <p>
        {price}
        {currency}
      </p>
      <p>{catagory}</p>
      <p>{isspicy && <em> spicy🌶️ </em>}</p>
      <button onClick={() => onAdd(dish)}>ADD </button>
    </div>
  );
}

export default Dish;
