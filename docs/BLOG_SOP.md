# 博客新增内容 SOP（toolsfox.top）

> 适用范围：给 toolsfox.top 个人博客新增文章。任何人（包括 AI Agent）新增博客都必须按此流程执行。

## 0. 铁律（先读）

- **源码唯一正主**：`/Users/jintunda/Documents/Qoder/2026-07-27/chat-6/magic-portfolio`（GitHub: istoolsfox/magic-portfolio）。禁止在其他目录另起副本改代码。
- **严禁在服务器上构建**（2核/1.6G/ESSD Entry 2120 IOPS，构建会打爆磁盘导致整机崩溃）。
- 部署只用项目根目录的 `./deploy.sh`（自动 commit → 本地构建 → push GitHub → rsync → pm2 restart → 探活）。

## 1. 新建文章文件

位置：`src/app/blog/posts/<slug>.mdx`

- slug 用英文小写连字符命名，语义化（如 `n8n-ecommerce-refactor`），slug 即最终 URL：`/blog/<slug>`
- 一篇文章一个 `.mdx` 文件，不需要注册路由，构建时自动收录

## 2. Frontmatter 规范（必填/选填）

```yaml
---
title: "中文标题（必填）"
subtitle: "副标题（选填，一句话补充）"
summary: "摘要（必填，2-3 句，说清问题→方案→效果，会显示在列表页和 SEO）"
publishedAt: "YYYY-MM-DD"        # 必填，决定列表排序（新在前）
tag: "分类标签"                   # 必填，单个字符串
image: "/images/blog/xxx.jpg"    # 选填，封面图
---
```

已有 tag 体系（优先复用，不轻易新造）：
- `Automation` —— n8n / 业务流程自动化
- `Agent Lab` —— AI Agent 实战
- `Local LLM Lab` —— 本地大模型实验

## 3. 正文写作规范（实战复盘风格）

固定章节骨架：

```
## 背景        —— 业务痛点，说人话，不堆术语
## 方案        —— 架构/流程图（用 ```text 画）+ 关键设计决策（加粗要点）
## 踩过的坑    —— 真实教训，一条一条列
## 效果        —— 量化前后对比（避免编造精确数字，用"大幅减少"这类可信表述）
## 总结        —— 可复用的经验
```

- 中文写作，中英文之间留空格
- 代码块标注语言；流程图用 `text` 代码块
- 不写空话套话，每一节都要有信息量

## 4. 图片（如需要）

- 放 `public/images/blog/`（目录不存在则创建）
- 文件名与文章 slug 关联（如 `n8n-refactor-arch.png`）
- 正文引用：`![描述](/images/blog/xxx.png)`

## 5. 本地验证（部署前必做）

```bash
cd /Users/jintunda/Documents/Qoder/2026-07-27/chat-6/magic-portfolio
npm run build   # 必须 0 报错，确认新 slug 出现在构建输出的路由列表里
```

可选：`npm run dev` 后浏览 `http://localhost:3000/blog/<slug>` 人工核对排版。

## 6. 部署

```bash
./deploy.sh
```

脚本已包含：git 自动提交备份 → 本地构建 → 推送 GitHub → rsync 到服务器 → pm2 restart → 探活验证。

## 7. 上线核对清单

- [ ] `https://toolsfox.top/blog/<slug>` 返回 200 且排版正常
- [ ] `https://toolsfox.top/blog` 列表页出现新文章且排序正确
- [ ] deploy.sh 探活输出 ✅（非 200 会自动报错并给出排查命令）
