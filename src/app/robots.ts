import { baseURL } from "@/resources";

// 静态导出模式（STATIC_EXPORT=1）必需：元数据路由显式声明构建期生成
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
