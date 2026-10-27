import { notFound } from "next/navigation";
import { getDish } from "../dishes";

// params arrives as a prop (a Promise in Next 15+), so we await it — no hook
export default async function DishPage({ params }) {
  const { id } = await params; // e.g. "kitfo" — always a string
  const dish = getDish(id);
  if (!dish) notFound(); // renders app/not-found.js

  return (
    <main>
      <p className="text-sm text-stone-500">id from params: {id}</p>
      <h1 className="text-2xl font-bold">{dish.name}</h1>
      <p>{dish.price} birr · {dish.category}</p>
    </main>
  );
}
