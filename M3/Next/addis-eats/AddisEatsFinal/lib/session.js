import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { users } from "../app/data/users";

const COOKIE_NAME = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET is not set. Add it in your hosting environment variables.",
    );
  }

  // Development only. Never used in production.
  return "dev-only-secret-change-me";
}

function sign(value) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

// The cookie looks like "user_1.<signature>". Without the secret nobody can
// forge a cookie for another user (the old version stored the bare user id).
export function createSessionValue(userId) {
  return `${userId}.${sign(userId)}`;
}

function readSessionValue(value) {
  if (!value) return null;

  const dot = value.lastIndexOf(".");
  if (dot === -1) return null;

  const userId = value.slice(0, dot);
  const signature = Buffer.from(value.slice(dot + 1));
  const expected = Buffer.from(sign(userId));

  if (signature.length !== expected.length) return null;
  if (!timingSafeEqual(signature, expected)) return null;

  return userId;
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: SESSION_MAX_AGE,
  path: "/",
};

export async function getSession() {
  const cookieStore = await cookies();
  const userId = readSessionValue(cookieStore.get(COOKIE_NAME)?.value);

  if (!userId) return null;

  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  // Never hand the password to pages or components.
  const { password, ...safeUser } = user;
  void password;
  return safeUser;
}
