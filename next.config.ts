import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./lib/i18n/request.ts"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "xavwlhq6z2da5ji0.public.blob.vercel-storage.com" }
    ]
  }
};

export default withNextIntl(nextConfig);