import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
         protocol: "https",
         hostname: "firebasestorage.googleapis.com",
      }
    ],
  },
  // Ensure class names are preserved for TypeORM metadata
  webpack: (config, { isServer }) => {
    if (config.optimization && config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer: any) => {
        if (minimizer.options && minimizer.options.terserOptions) {
          minimizer.options.terserOptions.keep_classnames = true;
          minimizer.options.terserOptions.keep_fnames = true;
        }
      });
    }
    return config;
  }
};

export default nextConfig;
