"use client"; // useState — the Day 37 "layout keeps state" demo, now its own leaf
import { useState } from "react";

export default function LayoutCounter() {
  const [count, setCount] = useState(0);
  return (
    <button className="rounded bg-stone-700 px-3 py-1 text-sm text-white" onClick={() => setCount(count + 1)}>
      Counter: {count}
    </button>
  );
}
