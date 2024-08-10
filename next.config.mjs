import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "firebasestorage.googleapis.com" }, {
      hostname: "img.clerk.com",
    }],
  },
};

export default nextConfig;
