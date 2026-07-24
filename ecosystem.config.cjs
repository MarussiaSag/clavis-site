const fs = require("node:fs");
const path = require("node:path");

/** PM2: из корня проекта после сборки standalone — cwd = каталог с server.js */

const RUNTIME_DIR = "/var/www/clavis-site";

function loadEnvFile(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;

  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq <= 0) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const fileEnv = loadEnvFile(path.join(RUNTIME_DIR, ".env"));

module.exports = {
  apps: [
    {
      name: "clavis-site",
      cwd: RUNTIME_DIR,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        UPLOAD_PUBLIC_DIR: fileEnv.UPLOAD_PUBLIC_DIR || `${RUNTIME_DIR}/public`,
        SHARP_OPTIMIZE: fileEnv.SHARP_OPTIMIZE || "false",
        ADMIN_COOKIE_SECURE: fileEnv.ADMIN_COOKIE_SECURE || "false",
        ...fileEnv,
      },
    },
  ],
};
