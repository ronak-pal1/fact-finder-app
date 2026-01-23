module.exports = {
  apps: [
    {
      name: "express-server",
      script: "dist/index.js",
      cwd: "/home/ubuntu/fact-finder/server",
      env_file: ".env",
    },
  ],
};
