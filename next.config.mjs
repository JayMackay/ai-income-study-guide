/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/ai-income-study-guide' : '',
  images: { unoptimized: true }
};
export default nextConfig;
