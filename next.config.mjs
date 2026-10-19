const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

export default {
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: csp },
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
