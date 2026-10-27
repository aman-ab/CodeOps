import { cookies } from "next/headers";

// DEMO session: a plain cookie holding a user id. It is NOT real authentication —
// anyone can forge it. Replace with a signed session (Auth.js, iron-session…) in production.
export async function getSession() {
  const value = (await cookies()).get("session")?.value;
  return value && /^[a-z0-9_-]{2,20}$/.test(value) ? { id: value } : null;
}
