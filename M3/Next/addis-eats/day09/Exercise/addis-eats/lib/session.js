import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SESSION_COOKIE, SESSION_MAX_AGE } from "./sessionCookie";
import { getUserById } from "./users";

// The signing secret lives in .env.local WITHOUT the NEXT_PUBLIC prefix, so it never reaches the browser.
function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is missing or shorter than 32 characters (see .env.example)");
  }
  return new TextEncoder().encode(secret);
}

async function createToken(userId) {
  return new SignJWT({}) // the only claim is the subject: WHO. Role and name are looked up fresh.
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

// Exercise 1 — the ONE helper every page, action and route handler uses.
// Returns { id, name, role } or null. Verifies the signature and expiry, then loads the user,
// so a deleted user or a changed role takes effect immediately instead of living in the token.
export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return payload.sub ? getUserById(payload.sub) : null;
  } catch (err) {
    if (err?.message?.includes("SESSION_SECRET")) throw err; // a config mistake must be loud
    return null; // forged, tampered or expired token: treat as signed out
  }
}

// Exercise 2 — the cookie, with every flag set.
export async function setSessionCookie(userId) {
  (await cookies()).set(SESSION_COOKIE, await createToken(userId), {
    httpOnly: true, // JavaScript on the page cannot read it
    secure: process.env.NODE_ENV === "production", // HTTPS only (see note in AUTH.md about localhost)
    sameSite: "lax", // not sent on cross-site POSTs
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete(SESSION_COOKIE);
}
