# ToolsFox Portfolio

我的个人网站与技术博客：**[toolsfox.top](https://toolsfox.top)**

AI 应用工程师 / 全栈开发者。这里记录我在 AI Agent、工作流自动化（n8n）、本地大模型等方向的实战复盘。

## 网站内容

- **[Blog](https://toolsfox.top/blog)** —— 实战复盘型技术博客（背景 → 方案 → 踩坑 → 效果 → 总结）
- **[Work](https://toolsfox.top/work)** —— 项目作品集：电商自动化系统、企业级 AI Agent、AI 运维工作流等
- **[About](https://toolsfox.top/about)** —— 关于我
- **[Chat to Me](https://toolsfox.top/chat)** —— 在线联系表单
- **[Gallery](https://toolsfox.top/gallery)** —— 相册

## 技术栈

- Next.js 16（App Router）+ MDX 内容系统
- Once UI 组件库
- 部署：本地构建 → rsync → PM2（阿里云 ECS + Nginx）

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
```

## 新增博客文章

在 `src/app/blog/posts/` 下新建 `<slug>.mdx` 即可，无需注册路由。
完整规范见 [docs/BLOG_SOP.md](docs/BLOG_SOP.md)。

## 部署

```bash
./deploy.sh
```

一键完成：git 提交备份 → 本地构建 → 推送 GitHub → rsync 同步服务器 → PM2 重启 → 探活验证。
（注意：严禁在服务器上执行构建，详见 deploy.sh 注释。）

---

基于 [Once UI Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) 模板定制。
