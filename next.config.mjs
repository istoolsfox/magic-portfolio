import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  // 知识库迁移文章大量使用 GFM 表格/删除线，MDX 默认管线不识别；
  // Turbopack 要求 options 可序列化，插件只能传模块名字符串（loader 构建期动态 import）
  options: { remarkPlugins: ["remark-gfm"] },
});

// STATIC_EXPORT=1：GitHub Pages 静态导出模式（trailingSlash 兼容 GH Pages 目录结构）。
// 动态 API（/api/*、/feed.xml）不参与导出，由 CF Worker 网关回源 ECS 提供。
const STATIC_EXPORT = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(STATIC_EXPORT
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // 站点图标等静态资源基本不变，长缓存
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
