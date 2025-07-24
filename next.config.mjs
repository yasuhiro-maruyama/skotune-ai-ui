/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"], // ここに許可したい外部ホスト名を追加
  },
};

export default nextConfig;
