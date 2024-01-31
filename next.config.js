const nextConfig = {
  // strictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
