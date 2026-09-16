import DishCard from "./DishCard";

function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="card-container">
      {dishes.map((dish) => (
        <DishCard key={dish.id} {...dish} />
      ))}
    </div>
  );
}

export default DishList;
