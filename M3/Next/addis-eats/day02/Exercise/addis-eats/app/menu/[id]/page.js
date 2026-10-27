import { notFound } from "next/navigation";
import { getDish, getDishes } from "../dishes";

// One static HTML page per dish, at build time
export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

// export const dynamicParams = false; // uncomment to 404 for ids not listed above

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  return (
    <main>
      <p className="text-sm text-stone-500">id from params: {id}</p>
      <h1 className="text-2xl font-bold">{dish.name}</h1>
      <p>{dish.price} birr · {dish.category}</p>
    </main>
  );
}
