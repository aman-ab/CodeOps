import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { formatETB } from "../../lib/format";

// SERVER component: markup + an optimised image. Only AddToCartButton is client code.
// width/height = the photo's aspect ratio (4:3), so the browser reserves the space before it loads.
// sizes = how wide the image is actually DISPLAYED, so the browser downloads the right srcset entry:
//   phones: 2 columns (~46vw) · tablets: 2 columns beside the sidebar (~35vw) · desktop: 3 columns (~248px)
export default function DishCard({
  dish,
  href,
  sizes = "(max-width: 768px) 46vw, (max-width: 1024px) 35vw, 248px",
}) {
  return (
    <div className="overflow-hidden rounded border bg-white">
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
