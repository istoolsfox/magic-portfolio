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
import { Posts } from "@/components/blog/Posts";
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
  const total = getPosts(["src", "app", "blog", "posts"]).length;
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
            📚 全部文章目录（{total} 篇）→
          </Text>
        </SmartLink>
      </Row>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
        <Row fillWidth horizontal="between" vertical="center" marginLeft="l">
          <Heading as="h2" variant="heading-strong-xl">
            近期文章
          </Heading>
          <SmartLink href="/blog/archive">
            <Text onBackground="neutral-weak" variant="label-default-m">
              更早的文章见目录 →
            </Text>
          </SmartLink>
        </Row>
        <Posts range={[4, 15]} columns="2" />
      </Column>
    </Column>
  );
}
