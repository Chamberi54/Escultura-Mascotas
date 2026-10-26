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
