#!/usr/bin/env bash
set -euo pipefail

# Run on the server after each deploy (called from GitHub Actions).
# Expects DEPLOY_PATH to be the app root (same directory as server.js).

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  nvm use 20 >/dev/null
fi

export NODE_ENV=production

if [ -f .env ]; then
  set -a
  # shellcheck source=/dev/null
  . ./.env
  set +a
fi

mkdir -p logs data

if [ -f .app.pid ] && kill -0 "$(cat .app.pid)" 2>/dev/null; then
  kill "$(cat .app.pid)" || true
  sleep 1
fi

nohup node server.js >>logs/app.log 2>&1 &
echo $! > .app.pid
echo "Started clavis-site (pid $(cat .app.pid))"
