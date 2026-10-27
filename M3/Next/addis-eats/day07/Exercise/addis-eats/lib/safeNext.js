// Exercise 5 — never redirect to a URL taken from the request without checking it.
//
// The sheet's one-liner (`startsWith("/")`) is NOT enough: "//evil.example" and "/\evil.example"
// both start with a slash, and browsers treat them as protocol-relative links to another site.
// So: require a single leading slash, then parse it and confirm it stays on our own origin.
const PLACEHOLDER = "http://placeholder.invalid";

export function safeNext(next, fallback = "/") {
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  try {
    const url = new URL(next, PLACEHOLDER);
    if (url.origin !== PLACEHOLDER) return fallback;
    if (url.pathname === "/signin") return fallback; // do not bounce back to the sign-in page
    return url.pathname + url.search + url.hash;
  } catch {
    return fallback;
  }
}
