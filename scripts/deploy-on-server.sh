#!/usr/bin/env bash
# Ручной деплой на Ubuntu (PM2). Запускать из корня git-репозитория на сервере.
# Пример: /var/www/clavis-site-src — клон репо; /var/www/clavis-site — runtime (server.js).
#
#   export REPO_DIR=/var/www/clavis-site-src
#   export RUNTIME_DIR=/var/www/clavis-site
#   bash scripts/deploy-on-server.sh

set -euo pipefail

REPO_DIR="${REPO_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
RUNTIME_DIR="${RUNTIME_DIR:-/var/www/clavis-site}"

echo "Repo:    $REPO_DIR"
echo "Runtime: $RUNTIME_DIR"

cd "$REPO_DIR"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  nvm use "${NODE_VERSION:-24}" >/dev/null 2>&1 || nvm use default >/dev/null 2>&1 || true
fi

if [ -f "$RUNTIME_DIR/.env" ]; then
  set +u
  set -a
  # shellcheck source=/dev/null
  . "$RUNTIME_DIR/.env"
  set +a
  set -u
fi

export DATABASE_URL="${DATABASE_URL:-file:./data/prod.db}"

mkdir -p "$RUNTIME_DIR/data" "$RUNTIME_DIR/logs"

# База рядом с runtime (путь из .env относительно RUNTIME_DIR)
if [[ "$DATABASE_URL" == file:./data/* ]]; then
  ln -sfn "$RUNTIME_DIR/data" "$REPO_DIR/data"
fi

# NODE_ENV=production до npm ci отключает devDependencies (Tailwind/PostCSS нужны на build).
echo "→ npm ci"
npm ci

echo "→ prisma migrate deploy"
npx prisma migrate deploy

echo "→ npm run build"
npm run build

export NODE_ENV=production

echo "→ копирование standalone в $RUNTIME_DIR"
mkdir -p "$RUNTIME_DIR/.next"
rsync -a --delete .next/standalone/ "$RUNTIME_DIR/" \
  --exclude 'public/chaveta' \
  --exclude 'public/zil'
rsync -a .next/static/ "$RUNTIME_DIR/.next/static/"
rsync -a public/ "$RUNTIME_DIR/public/" \
  --exclude 'chaveta/' \
  --exclude 'zil/'

if [ -f "$RUNTIME_DIR/.env" ]; then
  cp "$RUNTIME_DIR/.env" "$RUNTIME_DIR/.env"
fi

if command -v pm2 >/dev/null 2>&1; then
  echo "→ pm2 restart clavis-site"
  pm2 restart clavis-site || pm2 start "$REPO_DIR/ecosystem.config.cjs"
  pm2 save
else
  echo "PM2 не найден. Запуск: cd $RUNTIME_DIR && node server.js"
fi

echo "Готово. Node: $(node -v)"
