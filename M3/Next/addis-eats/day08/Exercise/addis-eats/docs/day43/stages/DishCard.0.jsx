import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { formatETB } from "../../lib/format";

// STAGE 0 (baseline): plain <img>. Every card downloads the whole 1600px original, and the page
// jumps because no space is reserved before the image arrives.
export default function DishCard({ dish, href }) {
  return (
    <div className="overflow-hidden rounded border bg-white">
      <img src={`/dishes/${dish.id}.jpg`} alt={dish.alt} className="w-full" />
      <div className="space-y-2 p-3">
        <div>
          <h3 className="font-semibold">
            {href ? <Link className="underline" href={href}>{dish.name}</Link> : dish.name}
          </h3>
          <p className="text-sm text-stone-600">{dish.category} · {formatETB(dish.price)}</p>
        </div>
        <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
      </div>
    </div>
  );
}
