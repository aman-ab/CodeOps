const STEPS = [
  ["placed", "Order placed"],
  ["preparing", "Preparing"],
  ["on_the_way", "On the way"],
  ["delivered", "Delivered"],
];

export default function StatusSteps({ status }) {
  if (status === "cancelled") {
    return <p className="rounded border border-red-300 bg-red-50 p-3 font-semibold text-red-700">This order was cancelled.</p>;
  }
  const current = STEPS.findIndex(([key]) => key === status);
  return (
    <ol className="flex flex-wrap gap-2" aria-label="Order progress">
      {STEPS.map(([key, label], i) => (
        <li
          key={key}
          aria-current={i === current ? "step" : undefined}
          className={`rounded px-3 py-1 text-sm ${i <= current ? "bg-green-700 text-white" : "bg-stone-200 text-stone-600"}`}
        >
          {label}
        </li>
      ))}
    </ol>
  );
}
