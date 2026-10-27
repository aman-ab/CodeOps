"use client";

export default function Error({ reset }) {
  return (
    <div className="page text-center">
      <p className="text-6xl" aria-hidden="true">😕</p>
      <h1 className="page-title mt-4">We could not load the menu</h1>
      <p className="page-subtitle mx-auto">Please try again in a moment.</p>
      <button onClick={() => reset()} className="btn btn-primary mt-8">
        Try again
      </button>
    </div>
  );
}
