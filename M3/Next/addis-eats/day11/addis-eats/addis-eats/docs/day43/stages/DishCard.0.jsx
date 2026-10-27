import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { formatETB } from "../../lib/format";

// SERVER component: markup + an image. Only AddToCartButton is client code.
// `as` = the heading level: h2 inside a list under the page's h1, h1 when the card IS the page (dish page).
export default function DishCard({
  dish,
  href,
  as: Heading = "h2",
  sizes = "(max-width: 768px) 46vw, (max-width: 1024px) 35vw, 248px",
}) {
  return (
    <div className="overflow-hidden rounded border bg-white">
      {/* STAGE 0 (baseline): plain <img>. Every card downloads the 1600px original and the page jumps. */}
      <img src={`/dishes/${dish.id}.jpg`} alt={dish.alt} className="w-full" />
      <div className="space-y-2 p-3">
        <div>
          <Heading className="font-semibold">
            {href ? <Link className="underline" href={href}>{dish.name}</Link> : dish.name}
          </Heading>
          <p className="text-sm text-stone-600">{dish.category} · {formatETB(dish.price)}</p>
        </div>
        <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
      </div>
    </div>
  );
}
