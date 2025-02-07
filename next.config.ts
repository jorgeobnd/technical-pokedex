import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "http", // Si usa HTTPS, cámbielo a 'https'
        hostname: "localhost",
        port: "3000", // Ajuste el puerto si es diferente
      },
    ],
  },
};

export default nextConfig;
