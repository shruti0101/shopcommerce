/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-95499677107048b0be7746aae952b533.r2.dev",
      },
    ],
  },
};

export default nextConfig;