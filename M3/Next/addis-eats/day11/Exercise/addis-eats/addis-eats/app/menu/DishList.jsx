import DishCard from "./DishCard";

// SERVER component. The data-component attribute is a marker you can grep for in
// .next/static to prove this file is NOT shipped to the browser.
export default function DishList({ dishes }) {
  return (
    <ul data-component="DishList-v1" className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {dishes.map((d) => (
        <li key={d.id} data-category={d.category}>
          <DishCard dish={d} href={`/menu/${d.id}`} />
        </li>
      ))}
    </ul>
  );
}
