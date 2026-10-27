import Image from "next/image";
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
      {/* width/height = the photo's aspect ratio (4:3): space is reserved before it loads.
          sizes = how wide it is actually DISPLAYED: phones ~46vw, tablets ~35vw, desktop 248px. */}
      <Image
        src={`/dishes/${dish.id}.jpg`}
        alt={dish.alt}
        width={400}
        height={300}
        sizes={sizes}
        className="h-auto w-full"
      />
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
