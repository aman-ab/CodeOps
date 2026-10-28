import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "../lib/seo";
import { AREAS } from "../lib/areas";
import { list } from "../lib/format";

export const metadata = buildMetadata({
  description: `Ethiopian food from Addis kitchens, delivered to ${list.format(AREAS)}. Browse the menu and order online.`,
  path: "/",
});

export default function HomePage() {
  return (
    <main className="space-y-6">
      {/* The largest image visible without scrolling = the LCP candidate: NOT yet marked priority (stage 1).
          `fill` needs a sized, positioned parent; width/height are not needed with fill.
          (On Next.js 16 `priority` is deprecated: write `preload` instead, same behaviour.) */}
      <div className="relative aspect-[16/7] w-full overflow-hidden rounded-lg bg-stone-200">
        <Image
          src="/hero.jpg"
          alt="A shared platter of injera with doro wot, kitfo and vegetable stews"
          fill
          sizes="(max-width: 1024px) 100vw, 976px"
          className="object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold">Ethiopian food from Addis kitchens, delivered across Addis Ababa</h1>
      <Link className="inline-block underline" href="/menu">See the menu</Link>
    </main>
  );
}
