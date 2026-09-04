import {
  Heading,
  Text,
  Button,
  Avatar,
  IconButton,
  Chip,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, routes, person, baseURL } from "@/resources";
import { Posts } from "@/components/blog/Posts";
import { WeChatQRCard } from "@/components/WeChatQRCard";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero */}
      <Column fillWidth horizontal="center" position="relative">
        <Column maxWidth="s" horizontal="center" align="center" gap="24" paddingY="64" zIndex={1}>
          <RevealFx translateY="8">
            <Avatar src={person.avatar} size={6.5} />
          </RevealFx>
          <RevealFx translateY="8" delay={0.1}>
            <Heading wrap="balance" variant="display-strong-l" align="center">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="body-default-l"
              align="center"
            >
              {home.subline}
            </Text>
          </RevealFx>
          {home.focus && home.focus.length > 0 && (
            <RevealFx translateY="8" delay={0.3}>
              <Row gap="8" wrap vertical="center" horizontal="center">
                {home.focus.map((item) => (
                  <Chip key={item} label={item} />
                ))}
              </Row>
            </RevealFx>
          )}
          <RevealFx translateY="8" delay={0.4}>
            <Row gap="12" wrap vertical="center" horizontal="center" paddingTop="16">
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="primary"
                size="m"
                suffixIcon="arrowRight"
              >
                关于我
              </Button>
              {routes["/chat"] && (
                <Button id="chat" data-border="rounded" href="/chat" variant="secondary" size="m">
                  联系我
                </Button>
              )}
              <Row gap="12" paddingLeft="8" vertical="center">
                <WeChatQRCard>
                  <IconButton
                    href="/images/wechat-qr.jpg"
                    icon="wechat"
                    variant="secondary"
                    size="m"
                    tooltip="微信"
                    tooltipPosition="bottom"
                  />
                </WeChatQRCard>
                <Button
                  href="https://bonjour.bio/toolsfox"
                  target="_blank"
                  rel="noreferrer"
                  prefixIcon="bonjour"
                  variant="secondary"
                  size="m"
                  aria-label="Bonjour"
                />
                <IconButton
                  href={`mailto:${person.email}`}
                  icon="email"
                  variant="secondary"
                  size="m"
                  tooltip="Email"
                  tooltipPosition="bottom"
                />              </Row>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* 最新文章 */}
      {routes["/blog"] && (
        <Column fillWidth gap="16">
          <Row fillWidth vertical="center" horizontal="between" paddingX="l">
            <Heading as="h2" variant="display-strong-xs">
              最新文章
            </Heading>
            <Button href="/blog" variant="tertiary" size="s" suffixIcon="arrowRight">
              全部文章
            </Button>
          </Row>
          <Column paddingX="l">
            <Posts range={[1, 2]} columns="2" />
          </Column>
        </Column>
      )}
    </Column>
  );
}
