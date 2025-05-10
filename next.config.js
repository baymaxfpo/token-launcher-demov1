/** @type {import('next').NextConfig} */
const nextConfig = {
eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "pino-pretty": false,
      "encoding": false,
    };
    return config;
  },
}

module.exports = nextConfig
