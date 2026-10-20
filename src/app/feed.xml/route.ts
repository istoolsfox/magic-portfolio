import { getPosts } from "@/utils/utils";
import { baseURL, blog } from "@/resources";

// RSS 订阅源：取最新 20 篇。动态执行，发布新文章后无需重新构建
export const dynamic = "force-dynamic";

export async function GET() {
  const posts = getPosts(["src", "app", "blog", "posts"])
    .filter((post) => !Number.isNaN(Date.parse(post.metadata.publishedAt)))
    .sort((a, b) => (a.metadata.publishedAt < b.metadata.publishedAt ? 1 : -1))
    .slice(0, 20);

  const escape = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const items = posts
    .map((post) => {
      const url = `${baseURL}/blog/${post.slug}`;
      return `    <item>
      <title>${escape(post.metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
      <description>${escape(post.metadata.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(blog.title)}</title>
    <link>${baseURL}</link>
    <description>${escape(blog.description)}</description>
    <language>zh-cn</language>
    <atom:link href="${baseURL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
