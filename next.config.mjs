/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 40),
        pathname: "/storage/**"
      },
      {
        protocol: "https", // 올바른 프로토콜
        hostname: "img.icons8.com", // 올바른 도메인 이름
        pathname: "/**"
      }
    ]
  }
};
export default nextConfig;
