import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

// SERVER component: pure markup from data. Only AddToCartButton is client code.
export default function DishCard({ dish, href }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded border bg-white p-3">
      <div>
        <h3 className="font-semibold">
          {href ? <Link className="underline" href={href}>{dish.name}</Link> : dish.name}
        </h3>
        <p className="text-sm text-stone-600">{dish.category} · {dish.price} birr</p>
      </div>
      <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
    </div>
  );
}
