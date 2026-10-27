"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const next = searchParams.get("next") || "/";

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        next,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    window.location.href = data.redirectTo;
  }

  return (
    <main>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Sign In</button>

        {error && <p>{error}</p>}
      </form>

      <hr />

      <p>Demo accounts:</p>

      <p>Customer: aman@example.com / 1234</p>

      <p>Staff: staff@example.com / 1234</p>
    </main>
  );
}
