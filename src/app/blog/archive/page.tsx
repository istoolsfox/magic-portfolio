import {
  AccordionGroup,
  Column,
  Heading,
  Meta,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { baseURL, blog } from "@/resources";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: "文章目录",
    description: "全部文章目录，按门类分组，随发布自动更新。",
    baseURL,
    path: `${blog.path}/archive`,
    image: `/api/og/generate?title=${encodeURIComponent("文章目录")}`,
  });
}

// 门类固定排序；未列出的 tag 归入末尾（按名称排）
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

export default function Archive() {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const groups = new Map<string, typeof posts>();
  for (const post of posts) {
    const tag = (post.metadata.tag as string) || "其他";
    const list = groups.get(tag) ?? [];
    list.push(post);
    groups.set(tag, list);
  }
  for (const list of groups.values()) {
    list.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
  }
  const keys = [...groups.keys()].sort((a, b) => {
    const ia = GROUP_ORDER.indexOf(a);
    const ib = GROUP_ORDER.indexOf(b);
    return (
      (ia === -1 ? GROUP_ORDER.length : ia) -
        (ib === -1 ? GROUP_ORDER.length : ib) ||
      a.localeCompare(b, "zh")
    );
  });

  return (
    <Column maxWidth="m" paddingTop="24">
      <Heading marginBottom="s" variant="heading-strong-xl" marginLeft="24">
        文章目录
      </Heading>
      <Text
        marginBottom="l"
        marginLeft="24"
        onBackground="neutral-weak"
        variant="body-default-s"
      >
        共 {posts.length} 篇 · 按门类分组 · 新文章发布后自动进入对应分组
      </Text>
      <Column fillWidth marginLeft="24" marginBottom="48">
        <AccordionGroup
          items={keys.map((key) => {
            const list = groups.get(key)!;
            return {
              title: `${key} · ${list.length} 篇`,
              content: (
                <Column fillWidth gap="4" paddingTop="8">
                  {list.map((post) => (
                    <Row key={post.slug} fillWidth gap="16" vertical="center">
                      <Text
                        onBackground="neutral-weak"
                        variant="label-default-s"
                      >
                        {post.metadata.publishedAt}
                      </Text>
                      <SmartLink href={`/blog/${post.slug}`}>
                        <Text variant="body-default-s">
                          {post.metadata.title}
                        </Text>
                      </SmartLink>
                    </Row>
                  ))}
                </Column>
              ),
            };
          })}
        />
      </Column>
    </Column>
  );
}
