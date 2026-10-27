"use client"; // error boundaries must be client components

export default function Error({ error, reset }) {
  return (
    <div className="rounded border border-red-300 bg-red-50 p-4">
      <h2 className="font-bold text-red-700">Something went wrong</h2>
      <p>{error.message}</p>
      <button className="mt-2 rounded bg-red-600 px-3 py-1 text-white" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
