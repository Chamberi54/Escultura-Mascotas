import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
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
        destination: "/nuestras-obras",
        permanent: true,
      },
      {
        source: "/portfolio/:slug",
        destination: "/nuestras-obras/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
