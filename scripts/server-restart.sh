#!/usr/bin/env bash
set -euo pipefail

# Run on the server after each deploy (called from GitHub Actions).
# Expects DEPLOY_PATH to be the app root (same directory as server.js).

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

NODE_VERSION="${NODE_VERSION:-24}"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  if nvm use "${NODE_VERSION}" >/dev/null 2>&1; then
    :
  elif nvm use default >/dev/null 2>&1; then
    :
  else
    echo "Warning: nvm could not switch to Node ${NODE_VERSION}; using: $(command -v node) ($(node -v 2>/dev/null || echo unknown))"
  fi
fi

export NODE_ENV=production

if [ -f .env ]; then
  set +u
  set -a
  # shellcheck source=/dev/null
  . ./.env
  set +a
  set -u
fi

mkdir -p logs data

if [ -f .app.pid ] && kill -0 "$(cat .app.pid)" 2>/dev/null; then
  kill "$(cat .app.pid)" || true
  sleep 1
fi

nohup node server.js >>logs/app.log 2>&1 &
echo $! > .app.pid
echo "Started clavis-site with $(node -v) (pid $(cat .app.pid))"
