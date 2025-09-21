/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://tomato-wonderful-toad-572.mypinata.cloud/**")],
  },
};

export default nextConfig;
