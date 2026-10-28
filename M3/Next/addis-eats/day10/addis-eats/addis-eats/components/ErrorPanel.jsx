"use client"; // used by error.js files, which must be client components (they hold a retry handler)

export default function ErrorPanel({ what, reset }) {
  return (
    <div role="alert" className="rounded border border-red-300 bg-red-50 p-6">
      <h2 className="text-lg font-semibold text-red-800">We could not load {what}.</h2>
      <p className="mt-1 text-red-800">That is a problem on our side, not something you did. Your data is safe. Try again in a moment.</p>
      <button onClick={() => reset()} className="mt-3 rounded bg-red-700 px-4 py-2 text-white">Try again</button>
    </div>
  );
}
