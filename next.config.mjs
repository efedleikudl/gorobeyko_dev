/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Required for static export — images are pre-optimized at source
    unoptimized: true,
  },
}

export default nextConfig
