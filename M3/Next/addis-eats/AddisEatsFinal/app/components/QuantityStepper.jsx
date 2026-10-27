"use client";

import { MAX_QTY_PER_DISH } from "../../lib/pricing";

export default function QuantityStepper({ quantity, onChange, name }) {
  return (
    <div
      role="group"
      aria-label={`Quantity of ${name}`}
      className="inline-flex items-center rounded-full border border-ink-200 bg-white"
    >
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        aria-label={`Decrease ${name}`}
        className="flex size-9 items-center justify-center rounded-full text-lg text-ink-700 hover:bg-ink-100"
      >
        −
      </button>

      <span aria-live="polite" className="min-w-8 text-center text-sm font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= MAX_QTY_PER_DISH}
        aria-label={`Increase ${name}`}
        className="flex size-9 items-center justify-center rounded-full text-lg text-ink-700 hover:bg-ink-100 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
