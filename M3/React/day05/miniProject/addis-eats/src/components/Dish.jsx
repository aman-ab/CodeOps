// Same card as Day 29, but onAdd now receives the whole dish
// (the reducer needs the dish, not just its price).
function Dish({ dish, onAdd, currency = "ETB" }) {
  const { name, price, catagory, isspicy } = dish;
  return (
    <div className="card">
      <h2>{name}</h2>
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
