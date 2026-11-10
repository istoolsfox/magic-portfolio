#!/usr/bin/env bash
# 静态导出构建（GitHub Pages 用）：
# 把动态 API 路由临时挪走（rss/og/authenticate/check-auth/contact、feed.xml），
# 以 STATIC_EXPORT=1 构建纯静态站，构建结束（无论成败）自动还原。
# 动态端点由 CF Worker 网关回源 ECS 提供，见仓库 docs/ 与服务器 nginx。
set -euo pipefail
cd "$(dirname "$0")/.."

T="$(mktemp -d)"
restore() {
  for d in api feed.xml; do
    [ -d "$T/$d" ] && mv "$T/$d" "src/app/$d"
  done
}
trap restore EXIT

for d in src/app/api src/app/feed.xml; do
  [ -d "$d" ] && mv "$d" "$T/$(basename "$d")"
done

STATIC_EXPORT=1 npx next build
