import { NextResponse } from "next/server";

// Next.js 16 renamed "middleware" to "proxy".
// This is only a fast, optimistic check: "is there a session cookie at all?".
// The real check (is the cookie genuine, and is the user allowed?) happens in
// the pages and API routes through getSession() in lib/session.js.
export function proxy(request) {
  const session = request.cookies.get("session");

  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/order/:path*",
    "/track/:path*",
    "/kitchen/:path*",
    "/dashboard/:path*",
  ],
};
