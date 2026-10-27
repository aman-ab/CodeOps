import { cookies } from "next/headers";
import { users } from "../../../data/users";

export async function POST(request) {
  const body = await request.json();

  const user = users.find(
    (user) => user.email === body.email && user.password === body.password,
  );

  if (!user) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      {
        status: 401,
      },
    );
  }

  const next = body.next || "/";

  if (!next.startsWith("/")) {
    return Response.json(
      {
        error: "Invalid redirect destination",
      },
      {
        status: 400,
      },
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return Response.json({
    redirectTo: next,
  });
}
