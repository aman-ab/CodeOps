"use client";

import { useState } from "react";

export default function SignOutButton({ className = "btn btn-ghost btn-sm" }) {
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    setBusy(true);

    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } finally {
      // Full reload so every page forgets the old session.
      window.location.href = "/signin";
    }
  }

  return (
    <button type="button" onClick={handleSignOut} disabled={busy} className={className}>
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
