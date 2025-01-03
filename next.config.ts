import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['www.google.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
