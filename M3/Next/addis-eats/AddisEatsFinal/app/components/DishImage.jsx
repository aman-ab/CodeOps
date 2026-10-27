import Image from "next/image";
import { CATEGORY_EMOJI } from "../../lib/format";

// Shows the dish photo, or a friendly emoji tile when a dish has no photo yet.
export default function DishImage({ dish, sizes, priority = false, className = "" }) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden bg-brand-50 ${className}`}>
      {dish.image ? (
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center text-5xl"
          style={{
            background:
              "linear-gradient(135deg, var(--color-gold-100), var(--color-brand-100))",
          }}
        >
          {CATEGORY_EMOJI[dish.category] ?? "🍽️"}
        </div>
      )}
    </div>
  );
}
