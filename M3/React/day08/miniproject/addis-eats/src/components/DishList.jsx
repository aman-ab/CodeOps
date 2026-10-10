import { memo } from "react";
import Dish from "./Dish";

// React.memo: skip re-rendering the whole list unless `dishes` or `onAdd`
// actually changed. This only works because Menu passes a stable `onAdd`
// (useCallback) and a stable `dishes` array (useMemo).
const DishList = memo(function DishList({ dishes, onAdd }) {
  return (
    <div className="card-container">
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAdd={onAdd} />
      ))}
    </div>
  );
});

export default DishList;
