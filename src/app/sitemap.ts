import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

// 静态导出模式（STATIC_EXPORT=1）必需：元数据路由显式声明构建期生成
export const dynamic = "force-static";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const works = routesConfig["/work"]
    ? getPosts(["src", "app", "work", "projects"]).map((post) => ({
        url: `${baseURL}/work/${post.slug}`,
        lastModified: post.metadata.publishedAt,
      }))
    : [];

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...works];
}
