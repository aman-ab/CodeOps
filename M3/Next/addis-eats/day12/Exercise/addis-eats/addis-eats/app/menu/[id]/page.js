import { notFound } from "next/navigation";
import DishCard from "../DishCard";
import JsonLd from "../../../components/JsonLd";
import { getDish, getDishes } from "../dishes";
import { buildMetadata, absoluteUrl } from "../../../lib/seo";
import { formatETB } from "../../../lib/format";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

// Exercise 3 — metadata derived from the dish record. Runs on the server before the page renders.
// getDish is wrapped in React cache(), so this and the page below share ONE lookup per request.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "Dish not found", robots: { index: false } };

  return buildMetadata({
    title: dish.name,
    // Distinct on every dish page: summary + price + category come from the record.
    description: `${dish.summary} ${formatETB(dish.price)} · ${dish.category}. Order from Addis Eats.`,
    path: `/menu/${dish.id}`,
    defaultImage: false, // this segment's opengraph-image.jsx supplies a card per dish
  });
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  // Exercise 5 — built from the SAME `dish` object the page renders below, and every field here is
  // visible on the page (name as the h1, summary as the paragraph, price in the card, photo above).
  // Structured data that disagrees with the page can cost you the rich result.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    image: absoluteUrl(`/dishes/${dish.id}.jpg`),
    url: absoluteUrl(`/menu/${dish.id}`),
    offers: { "@type": "Offer", price: dish.price.toFixed(2), priceCurrency: "ETB" },
  };

  return (
    <main className="max-w-xl space-y-4">
      <DishCard as="h1" dish={dish} sizes="(max-width: 768px) 100vw, 576px" />
      <p>{dish.summary}</p>
      <JsonLd data={jsonLd} />
    </main>
  );
}
