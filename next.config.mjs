/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://tomato-wonderful-toad-572.mypinata.cloud/**")],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["http://localhost:3000", "https://uploads.pinata.cloud/v3/files"],
    },
  },
};

export default nextConfig;
