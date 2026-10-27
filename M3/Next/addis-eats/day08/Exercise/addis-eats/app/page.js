import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      {/* The largest image visible without scrolling = the LCP candidate: the ONE `priority` image in the app.
          `fill` needs a sized, positioned parent; width/height are not needed with fill.
          (On Next.js 16 `priority` is deprecated: write `preload` instead, same behaviour.) */}
      <div className="relative aspect-[16/7] w-full overflow-hidden rounded-lg bg-stone-200">
        <Image
          src="/hero.jpg"
          alt="A shared platter of injera with doro wot, kitfo and vegetable stews"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 976px"
          className="object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold">Welcome to Addis Eats</h1>
      <Link className="inline-block underline" href="/menu">See the menu</Link>
    </main>
  );
}
