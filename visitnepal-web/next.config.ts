import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable gzip and brotli compression for static and server responses
  compress: true,

  // Image optimization with modern AVIF and WebP formats
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30-day edge cache for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
    ],
  },

  // Tree-shake heavy libraries into modular chunks
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
