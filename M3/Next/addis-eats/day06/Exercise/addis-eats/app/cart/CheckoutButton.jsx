"use client";
import { useRouter } from "next/navigation"; // never next/router on the app router

export default function CheckoutButton() {
  const router = useRouter();
  return (
    <button className="rounded bg-green-700 px-4 py-2 text-white" onClick={() => router.push("/checkout")}>
      Go to checkout
    </button>
  );
}
