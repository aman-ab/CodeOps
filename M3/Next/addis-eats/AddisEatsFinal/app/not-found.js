import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="page text-center">
      <p className="text-6xl">🍽️</p>
      <h1 className="page-title mt-4">Page not found</h1>
      <p className="page-subtitle mx-auto">
        We could not find what you were looking for. Maybe it has been eaten already.
      </p>
      <Link href="/dishes" className="btn btn-primary mt-8">
        Browse the menu
      </Link>
    </div>
  );
}
