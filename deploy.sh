#!/usr/bin/env bash
# toolsfox.top 一键部署脚本
# 流程：检查未提交变更 → 本地构建 → 推送 GitHub 备份 → rsync 同步服务器 → 重启 PM2 → 探活验证
# 注意：严禁在服务器上构建（2核/1.6G/ESSD Entry 2120 IOPS，会打爆磁盘导致整机崩溃）

set -euo pipefail

cd "$(dirname "$0")"

SERVER="toolsfox"
REMOTE_DIR="~/magic-portfolio"
NODE_BIN='$HOME/.nvm/versions/node/v22.22.3/bin'
SITE="https://toolsfox.top"

echo "==> [1/5] 检查 git 状态"
if [[ -n "$(git status --porcelain)" ]]; then
  echo "    有未提交变更，自动提交备份..."
  git add -A
  git commit -m "chore: deploy $(date '+%Y-%m-%d %H:%M')"
fi

echo "==> [2/5] 本地构建"
npm run build

echo "==> [3/5] 推送 GitHub 备份"
git push origin main || echo "    ⚠️ GitHub 推送失败（不阻塞部署），稍后手动 git push"

echo "==> [4/5] 同步到服务器（源码+产物，不含 node_modules/.git/构建缓存）"
rsync -az --delete \
  --exclude node_modules \
  --exclude .git \
  --exclude ".next/cache" \
  --exclude .env \
  ./ "${SERVER}:${REMOTE_DIR}/"

echo "==> [5/5] 重启并验证"
ssh -o ConnectTimeout=15 "$SERVER" "export PATH=${NODE_BIN}:\$PATH; pm2 restart portfolio && pm2 save"
sleep 6

code=$(curl -s -o /dev/null -w "%{http_code}" -m 10 "$SITE")
if [[ "$code" == "200" ]]; then
  echo "✅ 部署成功：$SITE -> $code"
else
  echo "❌ 探活异常：$SITE -> $code，请检查："
  echo "   ssh $SERVER 'export PATH=${NODE_BIN}:\$PATH; pm2 list; pm2 logs portfolio --lines 20 --nostream'"
  exit 1
fi
