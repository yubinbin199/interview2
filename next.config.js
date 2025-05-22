/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 移除静态导出设置，Vercel原生支持Next.js
  typescript: {
    // 部署时忽略类型错误
    ignoreBuildErrors: true,
  },
  eslint: {
    // 部署时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  // 可选：添加国际化配置
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  }
};

module.exports = nextConfig; 