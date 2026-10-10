import Dish from "./Dish";

// No React.memo here: with a handful of dishes no measurement justified it
// (see the optimisation ledger in PROFILE.md). `crashId` is for the dev crash test only.
function DishList({ dishes, onAdd, crashId }) {
  return (
    <div className="card-container">
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAdd={onAdd} explode={dish.id === crashId} />
      ))}
    </div>
  );
}

export default DishList;
