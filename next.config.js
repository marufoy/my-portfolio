const path = require("path");

/**
 * Firebase のビルドでは next.config.ts のコンパイル結果が ESM/CJS 混在になりやすいため、
 * CommonJS のこのファイルを公式エントリにする。
 * outputFileTracingRoot はローカルで親ディレクトリの lockfile 誤検知を抑えるための指定。
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.mt-maru.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
