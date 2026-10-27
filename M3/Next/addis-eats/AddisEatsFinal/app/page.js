import Link from "next/link";
import Image from "next/image";
import DishCard from "./components/DishCard";
import { getDishes } from "../lib/dishes";

const features = [
  { icon: "🛵", title: "Fast delivery", text: "Hot food from our Bole kitchen to your door, all across Addis Ababa." },
  { icon: "🌿", title: "Fresh ingredients", text: "Cooked to order with fresh spices, herbs and vegetables every day." },
  { icon: "🍽️", title: "Traditional recipes", text: "Authentic Ethiopian flavours, from kitfo to a full fasting platter." },
];

export default async function Home() {
  const dishes = await getDishes();
  const featured = dishes.filter((dish) => dish.image).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16">
        <div>
          <p className="badge bg-gold-100 text-[#7a5a00]">Now delivering in Addis Ababa</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Ethiopian food, <span className="text-brand-600">delivered fresh.</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-ink-600">
            Explore our collection of dishes, build your cart and have a hot meal at your door in no time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dishes" className="btn btn-primary">
              Browse menu
            </Link>
            <Link href="/cart" className="btn btn-secondary">
              View cart
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-ink-100">
          <Image
            src="/dishes/firfir.jpg"
            alt="A plate of firfir"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-ink-100 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-2xl" aria-hidden="true">
                {feature.icon}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{feature.title}</h2>
                <p className="mt-1 text-sm text-ink-500">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured dishes */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Popular right now</h2>
            <p className="mt-1 text-ink-500">A few favourites to get you started.</p>
          </div>
          <Link href="/dishes" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:block">
            See full menu →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        <Link href="/dishes" className="btn btn-secondary btn-block mt-8 sm:hidden">
          See full menu
        </Link>
      </section>

      {/* Fasting platters */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="card grid items-center overflow-hidden md:grid-cols-2">
          <div className="relative aspect-[4/3] md:h-full md:aspect-auto md:min-h-72">
            <Image
              src="/dishes/vegan.jpg"
              alt="Vegetarian dishes served on injera"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6 sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Fasting-friendly platters</h2>
            <p className="mt-3 text-ink-600">
              Our Beyaynetu brings together a colourful mix of vegetarian stews and salads, served with fresh injera.
            </p>
            <Link href="/dishes/8" className="btn btn-primary mt-6">
              Try the Beyaynetu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
