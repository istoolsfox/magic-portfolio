import {
  Column,
  Heading,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { BlogBrowser, BlogItem } from "@/components/blog/BlogBrowser";
import { baseURL, blog, person, newsletter } from "@/resources";
import { getPosts } from "@/utils/utils";

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
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
  const items: BlogItem[] = posts.map((p) => ({
    slug: p.slug,
    title: p.metadata.title,
    publishedAt: p.metadata.publishedAt,
    tag: (p.metadata.tag as string) || "其他",
    summary: p.metadata.summary || "",
  }));

  return (
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
      <Row
        fillWidth
        marginBottom="l"
        marginLeft="24"
        horizontal="between"
        vertical="center"
        s={{ horizontal: "start", gap: "12", wrap: true }}
      >
        <Heading variant="heading-strong-xl">{blog.title}</Heading>
        <SmartLink href="/blog/archive">
          <Text onBackground="brand-weak" variant="label-strong-m">
            📚 全量目录页 →
          </Text>
        </SmartLink>
      </Row>
      <BlogBrowser posts={items} />
      <Mailchimp marginBottom="l" marginTop="l" />
    </Column>
  );
}
