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
    ];
  },
};

export default nextConfig;
