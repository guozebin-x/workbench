module.exports = {
  apps: [
    {
      name: "rad-cli",
      script: "index.js",
      watch: ["libs", "routers", "index.js"],
      env: {
        COMMON_VARIABLE: "true"
      },
      env_test: {
        NODE_ENV: "test"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
