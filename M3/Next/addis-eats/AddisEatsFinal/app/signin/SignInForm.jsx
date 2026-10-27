"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const SHOW_DEMO = process.env.NEXT_PUBLIC_SHOW_DEMO_ACCOUNTS !== "false";

export default function SignInForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const next = searchParams.get("next") || "/";

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, next }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error ?? "Could not sign in. Please try again.");
        setSubmitting(false);
        return;
      }

      // Full page load so the header picks up the new session.
      window.location.href = data.redirectTo;
    } catch {
      setError("We could not reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="page max-w-md">
      <div className="card p-6 sm:p-8">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="mt-1 text-sm text-ink-500">Welcome back. Sign in to place and track orders.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <div className="alert alert-error" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary btn-block">
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {SHOW_DEMO && (
          <div className="mt-8 rounded-xl bg-ink-50 p-4 text-sm text-ink-600">
            <p className="font-semibold text-ink-800">Demo accounts</p>
            <p className="mt-2">Customer: aman@example.com / 1234</p>
            <p>Staff: staff@example.com / 1234</p>
          </div>
        )}
      </div>
    </div>
  );
}
