import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { EarlierPosts, PostCard } from "@/components/blog/EarlierPosts";
import { BlogShell } from "@/components/blog/BlogShell";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { getPosts } from "@/utils/utils";
import { baseURL, blog, person, newsletter } from "@/resources";

// 门类固定排序（与文章 tag 体系一致）
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

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  // Earlier posts 按需渲染：只传轻量元数据，客户端分块渲染（原版是一次性塞全部卡片）
  const allPosts = getPosts(["src", "app", "blog", "posts"]);
  const catCounts = new Map<string, number>();
  for (const p of allPosts) {
    const tag = (p.metadata.tag as string) || "其他";
    catCounts.set(tag, (catCounts.get(tag) ?? 0) + 1);
  }
  const cats = [...catCounts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => {
      const ia = GROUP_ORDER.indexOf(a.label);
      const ib = GROUP_ORDER.indexOf(b.label);
      return (
        (ia === -1 ? GROUP_ORDER.length : ia) -
          (ib === -1 ? GROUP_ORDER.length : ib) ||
        a.label.localeCompare(b.label, "zh")
      );
    });
  const items: PostCard[] = allPosts
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(3)
    .map((p) => ({
      slug: p.slug,
      metadata: {
        title: p.metadata.title,
        summary: p.metadata.summary,
        publishedAt: p.metadata.publishedAt,
        tag: p.metadata.tag as string | undefined,
      },
    }));
  return (
    <BlogShell
      summary="📑 文章目录"
      aside={<CategoryNav cats={cats} total={allPosts.length} />}
    >
      <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <EarlierPosts items={items} />
      </Column>
      </Column>
    </BlogShell>
  );
}
