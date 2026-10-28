const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    // Only hosts listed here may be resized by our optimiser. An unlisted host fails on purpose.
    remotePatterns: [{ protocol: "https", hostname: "cdn.addiseats.et" }],
    formats: ["image/avif", "image/webp"],
  },

  // Static rules belong here, not in middleware: they cost nothing per request.
  async redirects() {
    return [
      { source: "/dishes", destination: "/menu", permanent: true },
      { source: "/dishes/:id", destination: "/menu/:id", permanent: true },
    ];
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
