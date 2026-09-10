import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * A full Content-Security-Policy is deliberately not set here: this app ships
 * inline Next.js bootstrap scripts, so a correct policy needs per-request nonces
 * wired through middleware. Adding a broad `unsafe-inline` policy would look
 * like protection while providing very little, so it is left for a follow-up.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Inert over plain HTTP locally; takes effect once served over HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework version.
  poweredByHeader: false,
  images: {
    // AVIF first, WebP as the fallback for older clients.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
