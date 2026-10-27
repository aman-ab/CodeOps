"use client";

export default function Error({ reset }) {
  return (
    <div className="page text-center">
      <p className="text-6xl">😕</p>
      <h1 className="page-title mt-4">Something went wrong</h1>
      <p className="page-subtitle mx-auto">
        An unexpected error happened. Please try again.
      </p>
      <button onClick={() => reset()} className="btn btn-primary mt-8">
        Try again
      </button>
    </div>
  );
}
