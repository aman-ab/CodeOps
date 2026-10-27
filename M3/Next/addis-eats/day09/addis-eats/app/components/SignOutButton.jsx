"use client";

export default function SignOutButton() {
  async function handleSignOut() {
    await fetch("/api/auth/signout", {
      method: "POST",
    });

    window.location.href = "/signin";
  }

  return <button onClick={handleSignOut}>Sign Out</button>;
}
