/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 40),
        pathname: "/storage/**"
      }
    ]
  }
};
export default nextConfig;
