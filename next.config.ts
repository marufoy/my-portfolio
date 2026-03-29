import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Firebase Hosting（Web Frameworks）では /_next/image が環境によって失敗し、外部・ローカル画像が表示されないことがある
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/**',
      },
      // MicroCMS のカスタム画像ドメイン利用時（管理画面で設定したホストに合わせて追加）
      {
        protocol: 'https',
        hostname: '*.mt-maru.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
