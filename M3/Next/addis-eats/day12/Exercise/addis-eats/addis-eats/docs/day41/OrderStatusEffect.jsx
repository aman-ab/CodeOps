"use client";
// EXERCISE 2 — the BEFORE: the Day 29 pattern plus polling by hand.
// Three pieces of state, an effect, a cancellation flag, an interval and its cleanup,
// and still: no cache, no sharing between components, no dedup.
import { useEffect, useState } from "react";

export default function OrderStatusEffect({ id }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        if (!cancelled) { setOrder(data); setError(null); }
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const timer = setInterval(load, 5000);
    return () => { cancelled = true; clearInterval(timer); };
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error && !order) return <p>Could not load the order.</p>;
  return <p>Status: {order.status}</p>;
}
