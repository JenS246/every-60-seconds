import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS ? '/every-60-seconds' : '',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
