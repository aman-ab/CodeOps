"use client";
import { useEffect } from "react";
import ErrorPanel from "../../components/ErrorPanel";

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ErrorPanel what="the dashboard" reset={reset} />
    </main>
  );
}
