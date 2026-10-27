import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../components/AddToCartButton";
import DishImage from "../../components/DishImage";
import { getDishesById, getReviewsByDishId } from "../../../lib/dishes";
import { formatETB } from "../../../lib/format";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDishesById(id);

  if (!dish) return { title: "Dish not found" };

  return { title: dish.name, description: dish.description };
}

function Stars({ rating }) {
  const filled = Math.round(rating);

  return (
    <span aria-label={`${rating} out of 5 stars`} className="whitespace-nowrap text-gold-500">
      {"★".repeat(filled)}
      <span className="text-ink-200">{"★".repeat(5 - filled)}</span>
    </span>
  );
}

export default async function SingleDish({ params }) {
  const { id } = await params;

  const [dish, reviews] = await Promise.all([getDishesById(id), getReviewsByDishId(id)]);

  if (!dish) notFound();

  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : null;

  return (
    <div className="page">
      <Link href="/dishes" className="text-sm font-semibold text-brand-700 hover:underline">
        ← Back to menu
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-ink-100">
          <DishImage dish={dish} priority sizes="(min-width: 768px) 50vw, 100vw" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge bg-ink-100 text-ink-600">{dish.category}</span>
            {dish.isspicy && <span className="badge bg-brand-50 text-brand-700">🌶️ Spicy</span>}
          </div>

          <h1 className="page-title mt-3">{dish.name}</h1>

          {average !== null && (
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-500">
              <Stars rating={average} />
              {average.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </p>
          )}

          <p className="mt-4 text-ink-600">{dish.description}</p>

          <p className="mt-6 text-3xl font-bold text-ink-900">{formatETB(dish.price)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AddToCartButton dish={dish} large />
            <Link href="/cart" className="btn btn-secondary">
              Go to cart
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-14" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-2xl font-bold">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="mt-3 text-ink-500">No reviews yet for this dish.</p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <li key={review.id} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-sans text-base font-semibold">{review.reviewer}</h3>
                  <Stars rating={review.rating} />
                </div>
                <p className="mt-2 text-sm text-ink-600">{review.review}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
