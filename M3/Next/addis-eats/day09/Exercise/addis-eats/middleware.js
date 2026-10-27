import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "./lib/sessionCookie";

// A signed token is three base64url parts joined by dots.
const LOOKS_LIKE_A_TOKEN = /^[\w-]+\.[\w-]+\.[\w-]+$/;

// Layer 1 of 3 — a cheap, early redirect. It only proves a cookie EXISTS and is well-formed.
// It does NOT prove the signature: pages, handlers and actions verify with getSession().
export function middleware(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token || !LOOKS_LIKE_A_TOKEN.test(token)) {
    const url = new URL("/signin", request.url);
    // Exercise 4 — remember where they were going (validated again with safeNext after sign-in)
    url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Narrow on purpose: no images, no static files, no public pages.
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};

// Next.js 16 renamed this file convention: `middleware.js` still works but is deprecated.
// To migrate: rename to proxy.js and change `export function middleware` to `export function proxy`
// (or run: npx @next/codemod@canary middleware-to-proxy .)
