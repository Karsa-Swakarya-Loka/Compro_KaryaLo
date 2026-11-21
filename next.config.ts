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
  // Dev only: lets phones and other devices on the local network load dev
  // assets and HMR. The wildcard keeps working when the LAN IP changes.
  allowedDevOrigins: ["192.168.*.*"],
  experimental: {
    // Two root layouts (one per language) leave no single layout to render an
    // unmatched URL in; app/global-not-found.tsx covers that case.
    globalNotFound: true,
    // `inlineCss` was tried (2026-11-18) and left off: Next also repeats the CSS in
    // the RSC payload, so the home HTML grew 30 → 75 KB and mobile FCP got slower.
  },
  /*
    The portfolio moved from /works to /portfolio when the navbar was aligned
    on 2026-10-15. Permanent redirects keep every indexed and shared link
    working, case studies included.
  */
  async redirects() {
    return [
      { source: "/works", destination: "/portfolio", permanent: true },
      { source: "/works/:slug", destination: "/portfolio/:slug", permanent: true },
      { source: "/en/works", destination: "/en/portfolio", permanent: true },
      { source: "/en/works/:slug", destination: "/en/portfolio/:slug", permanent: true },
    ];
  },
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
