"use client";

import { Card, Column, Media, Row, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.metadata.image && thumbnail && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={post.metadata.image}
          alt={"Thumbnail of " + post.metadata.title}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column fillWidth paddingY="24" paddingX="l" gap="12" vertical="center">
          <Row fillWidth horizontal="between" vertical="center" gap="8" wrap>
            {post.metadata.tag && (
              <Text variant="label-strong-s" onBackground="brand-medium">
                {post.metadata.tag}
              </Text>
            )}
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Text>
        </Column>
      </Row>
    </Card>
  );
}
