import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['utfs.io'], // Add the domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '', // Leave empty unless a specific port is required
        pathname: '/**', // Allows all paths from this domain
      },
    ],
  },
}

export default nextConfig;
