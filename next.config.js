/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['www.giovankov.com'],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  experimental: {
    scrollRestoration: false,
  },
};

module.exports = nextConfig;
