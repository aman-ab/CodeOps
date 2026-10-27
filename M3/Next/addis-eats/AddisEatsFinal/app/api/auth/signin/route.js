import { cookies } from "next/headers";
import { users } from "../../../data/users";
import { createSessionValue, sessionCookieOptions } from "../../../../lib/session";

// Only allow redirects to pages on this site ("/orders"), never to other
// sites ("//evil.com" or "https://evil.com").
function safeNext(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  return value;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  const user = users.find(
    (u) => u.email.toLowerCase() === email && u.password === password,
  );

  if (!user) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("session", createSessionValue(user.id), sessionCookieOptions);

  return Response.json({ redirectTo: safeNext(body?.next) });
}
