import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const baseConfig = {
  output: 'export',
  trailingSlash: true,
}

const nextConfig = (phase) => {
  if (phase !== PHASE_DEVELOPMENT_SERVER) return baseConfig

  return {
    ...baseConfig,
    allowedDevOrigins: [
      '127.0.0.1',
      'code.gorobeyko.com',
      '*.vscode-cdn.net',
    ],
    assetPrefix: '/proxy/3000',
  }
}

export default nextConfig
