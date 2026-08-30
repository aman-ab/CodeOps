
function Dish({ name, price }) {
  return (
    <div className="dish-card">
      <h2>{name}</h2>
      <p>Price: {price} ETB</p>
    </div>
  );
}

export default Dish;