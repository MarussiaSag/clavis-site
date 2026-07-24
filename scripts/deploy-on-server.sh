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

# Next.js читает .env из корня репо при build — без копии worker может
# попасть в другой SQLite-файл и упасть на prerender.
if [ -f "$RUNTIME_DIR/.env" ]; then
  cp -a "$RUNTIME_DIR/.env" "$REPO_DIR/.env"
fi

# Абсолютный путь снимает расхождение migrate (cwd) vs Prisma Client (schema dir).
if [[ -z "${DATABASE_URL:-}" || "$DATABASE_URL" == file:./data/* || "$DATABASE_URL" == file:../data/* ]]; then
  export DATABASE_URL="file:${RUNTIME_DIR}/data/prod.db"
fi

mkdir -p "$RUNTIME_DIR/data" "$RUNTIME_DIR/logs"

# База рядом с runtime (путь из .env относительно RUNTIME_DIR)
if [[ "$DATABASE_URL" == file:./data/* ]]; then
  ln -sfn "$RUNTIME_DIR/data" "$REPO_DIR/data"
fi

# NODE_ENV=production до npm ci отключает devDependencies (Tailwind/PostCSS нужны на build).
echo "→ npm ci"
npm ci

# sharp: нативные биндинги под linux-x64 (иначе admin upload падает с ERR_DLOPEN_FAILED)
echo "→ sharp linux-x64"
npm install --os=linux --cpu=x64 --libc=glibc sharp

echo "→ prisma migrate deploy (DATABASE_URL=$DATABASE_URL)"
npx prisma migrate deploy

echo "→ npm run build"
npm run build

export NODE_ENV=production

echo "→ копирование standalone в $RUNTIME_DIR"
mkdir -p "$RUNTIME_DIR/.next" "$RUNTIME_DIR/logs" \
  "$RUNTIME_DIR/public/media" "$RUNTIME_DIR/public/projects" "$RUNTIME_DIR/public/blog"

# Не трогаем .env / data / logs / uploads: они исключены из rsync --delete.
# Бэкап во /tmp на маленьких VPS заполняет диск — не используем.

if [ "$REPO_DIR" = "$RUNTIME_DIR" ]; then
  echo "  repo = runtime: обновляем только артефакты сборки"
  STATIC_BACKUP=""
  if [ -d ".next/static" ]; then
    STATIC_BACKUP="$(mktemp -d)"
    # Если /tmp переполнен — копируем рядом с проектом
    if ! cp -a .next/static "$STATIC_BACKUP/" 2>/dev/null; then
      STATIC_BACKUP="$RUNTIME_DIR/.static-backup-$$"
      rm -rf "$STATIC_BACKUP"
      mkdir -p "$STATIC_BACKUP"
      cp -a .next/static "$STATIC_BACKUP/"
    fi
  fi
  rsync -a .next/standalone/server.js "$RUNTIME_DIR/"
  rsync -a .next/standalone/node_modules/ "$RUNTIME_DIR/node_modules/"
  rsync -a --delete .next/standalone/.next/ "$RUNTIME_DIR/.next/"
  if [ -n "$STATIC_BACKUP" ] && [ -d "$STATIC_BACKUP/static" ]; then
    rsync -a "$STATIC_BACKUP/static/" "$RUNTIME_DIR/.next/static/"
  fi
  rm -rf "$STATIC_BACKUP"
else
  rsync -a --delete .next/standalone/ "$RUNTIME_DIR/" \
    --exclude 'public' \
    --exclude '.env' \
    --exclude 'data' \
    --exclude 'logs'
  rsync -a .next/static/ "$RUNTIME_DIR/.next/static/"
fi

# Подтянуть полный sharp (libvips) из build-node_modules в runtime —
# standalone иногда копирует неполный набор нативных файлов.
if [ -d "$REPO_DIR/node_modules/sharp" ]; then
  echo "→ копирование sharp в runtime"
  mkdir -p "$RUNTIME_DIR/node_modules"
  rsync -a --delete "$REPO_DIR/node_modules/sharp/" "$RUNTIME_DIR/node_modules/sharp/"
  if [ -d "$REPO_DIR/node_modules/@img" ]; then
    mkdir -p "$RUNTIME_DIR/node_modules/@img"
    rsync -a "$REPO_DIR/node_modules/@img/" "$RUNTIME_DIR/node_modules/@img/"
  fi
fi

# Seed/static assets from repo — не затираем уже загруженные файлы.
rsync -a --ignore-existing public/ "$RUNTIME_DIR/public/" \
  --exclude 'chaveta/' \
  --exclude 'zil/'


mkdir -p "$RUNTIME_DIR/data"
if [ ! -f "$RUNTIME_DIR/.env" ]; then
  echo "Внимание: $RUNTIME_DIR/.env не найден — создайте из .env.example"
fi

if command -v pm2 >/dev/null 2>&1; then
  echo "→ pm2: node server.js (standalone, не next start)"
  pm2 delete clavis-site 2>/dev/null || true
  pm2 start "$REPO_DIR/ecosystem.config.cjs"
  pm2 save
else
  echo "PM2 не найден. Запуск: cd $RUNTIME_DIR && node server.js"
fi

echo "Готово. Node: $(node -v)"
