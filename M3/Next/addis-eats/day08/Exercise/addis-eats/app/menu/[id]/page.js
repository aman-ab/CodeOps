import { notFound } from "next/navigation";
import DishCard from "../DishCard";
import { getDish, getDishes } from "../dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  return (
    <main>
      <p className="mb-2 text-sm text-stone-500">id from params: {id}</p>
      <div className="max-w-xl"><DishCard dish={dish} sizes="(max-width: 768px) 100vw, 576px" /></div>
    </main>
  );
}
