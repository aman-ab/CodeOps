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
      {/* STAGE 0 (baseline): a plain <img>. No dimensions, no srcset, the full original file. */}
      <img src="/hero.jpg" alt="A shared platter of injera with doro wot, kitfo and vegetable stews" className="w-full rounded-lg" />
      <h1 className="text-3xl font-bold">Ethiopian food from Addis kitchens, delivered across Addis Ababa</h1>
      <Link className="inline-block underline" href="/menu">See the menu</Link>
    </main>
  );
}
