import type { NextConfig } from "next";
import { siteRedirects } from "./redirects.config";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return siteRedirects;
  },
};

export default nextConfig;
