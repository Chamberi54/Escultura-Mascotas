import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://news.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src 'self' https://news.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/team-building",
        destination: "/eventos-empresa",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/portfolio/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/nuestras-obras",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nuestras-obras/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/esculturas-personalizadas",
        destination: "/mascotas-personalizadas",
        permanent: true,
      },
      {
        source: "/esculturas-personalizadas/a-medida",
        destination: "/arte-personalizado",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
