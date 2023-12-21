/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Renamed from serverActions
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "img.clerk.com",
      "images.clerk.dev",
      "uploadthing.com",
      "placehold.co",
      "utfs.io",
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Moved from images to top-level
  },
};

module.exports = nextConfig;
