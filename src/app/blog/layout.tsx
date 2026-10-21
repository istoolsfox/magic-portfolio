import type { ReactNode } from "react";
import { Column, Row } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";
import { BlogSidebarTree, SidebarGroup } from "@/components/blog/BlogSidebar";

// 门类固定排序（与文章数据 tag 体系一致）
const GROUP_ORDER = [
  "知识库",
  "云栖大会·第一天",
  "云栖大会·第二天",
  "云栖大会·第三天",
  "云栖大会",
  "云栖深读",
  "审美手册",
  "一些思考",
  "AI-Evals",
  "链接情报",
  "研究",
];

export default function BlogLayout({ children }: { children: ReactNode }) {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
  const map = new Map<string, SidebarGroup>();
  for (const p of posts) {
    const tag = (p.metadata.tag as string) || "其他";
    const g = map.get(tag) ?? { label: tag, items: [] };
    g.items.push({ slug: p.slug, title: p.metadata.title });
    map.set(tag, g);
  }
  const groups = [...map.values()].sort((a, b) => {
    const ia = GROUP_ORDER.indexOf(a.label);
    const ib = GROUP_ORDER.indexOf(b.label);
    return (
      (ia === -1 ? GROUP_ORDER.length : ia) -
        (ib === -1 ? GROUP_ORDER.length : ib) ||
      a.label.localeCompare(b.label, "zh")
    );
  });

  return (
    <Row fillWidth horizontal="start" wrap>
      {/* 桌面：sticky 左栏，列表页与文章页常驻 */}
      <div className="blog-side-desktop">{<BlogSidebarTree groups={groups} />}</div>
      {/* 移动端：顶部折叠目录 */}
      <div className="blog-side-mobile">
        <details>
          <summary>📑 文章目录（{posts.length} 篇，点开按门类导航）</summary>
          {<BlogSidebarTree groups={groups} />}
        </details>
      </div>
      <Column fillWidth style={{ minWidth: 0 }}>
        {children}
      </Column>
    </Row>
  );
}
