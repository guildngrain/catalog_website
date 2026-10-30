import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow ngrok / tunnel hosts to load Next.js assets in development
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
  ],
};

export default nextConfig;
