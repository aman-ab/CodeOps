"use client"; // error boundaries hold a retry handler, so they must be client components
import { useEffect } from "react";
import ErrorPanel from "../../../components/ErrorPanel";

// ERROR: what failed, and a way to retry.
export default function Error({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Your orders</h1>
      <ErrorPanel what="your orders" reset={reset} />
    </main>
  );
}
