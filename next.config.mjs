const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

// The CSP is production-only: `next dev` injects inline styles and an HMR websocket that a strict policy would block.
const prod = process.env.NODE_ENV === "production";

export default {
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        ...(prod ? [{ key: "Content-Security-Policy", value: csp }] : []),
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
      ],
    },
    // "/" answers differently to curl/Wget/HTTPie (see proxy.ts), so caches must key on User-Agent.
    { source: "/", headers: [{ key: "Vary", value: "User-Agent" }] },
    { source: "/:file(.+\\.(?:png|svg|ico|webmanifest))", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
  ],
};
