module.exports = {
  apps: [
    {
      name: "master-cms-portal",
      script: "npm start",
      autorestart: true,
      env: {
        PORT: 1004,
        NODE_ENV: "production",
        SERVER_ENV: "production",
        DEBUG: "server:*",
        DEBUG_COLORS: true,
        NEXT_PUBLIC_ENV_API_PREFIX: "/api/v1",
        NEXT_PUBLIC_API_PREFIX: "/api/v1",
      },
    },
  ],
};
