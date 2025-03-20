import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Enable if you're using experimental features
  experimental: {
    // Enable if needed
    // serverActions: true,
  },
};

export default nextConfig;
