/** PM2: из корня проекта после сборки standalone — cwd = каталог с server.js */
module.exports = {
  apps: [
    {
      name: "clavis-site",
      cwd: "/var/www/clavis-site",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
