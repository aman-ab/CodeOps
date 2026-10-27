import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import DishImage from "./DishImage";
import { formatETB } from "../../lib/format";

export default function DishCard({ dish }) {
  return (
    <article className="card flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/dishes/${dish.id}`} className="block" aria-label={`View ${dish.name}`}>
        <DishImage dish={dish} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge bg-ink-100 text-ink-600">{dish.category}</span>
          {dish.isspicy && <span className="badge bg-brand-50 text-brand-700">🌶️ Spicy</span>}
        </div>

        <h3 className="mt-3 text-lg font-semibold">
          <Link href={`/dishes/${dish.id}`} className="hover:text-brand-700">
            {dish.name}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-ink-500">{dish.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="font-semibold text-ink-900">{formatETB(dish.price)}</span>
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}
