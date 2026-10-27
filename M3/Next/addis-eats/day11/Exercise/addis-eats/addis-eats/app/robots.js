import { absoluteUrl } from "../lib/seo";

export default function robots() {
  // Preview deployments are production builds on a public URL: keep them out of search results.
  // (VERCEL_ENV is set by Vercel; it does not exist on your laptop.)
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // A prefix match: "/orders" also covers "/orders/ord_800". Disallow stops CRAWLING; it is not security
        // (that is the session check on every page and action) and it does not hide a URL that is linked elsewhere.
        disallow: ["/cart", "/checkout", "/orders", "/kitchen", "/dashboard", "/signin", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
