import { Column, Heading, Meta, Schema, Text, Line } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { ChatForm } from "@/components/chat/ChatForm";

const chatMeta = {
  path: "/chat",
  title: `Chat to Me – ${person.name}`,
  description: "写信给我，内容会直接发送到我的邮箱",
};

export async function generateMetadata() {
  return Meta.generate({
    title: chatMeta.title,
    description: chatMeta.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(chatMeta.title)}`,
    path: chatMeta.path,
  });
}

export default function Chat() {
  return (
    <Column maxWidth="s" gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={chatMeta.title}
        description={chatMeta.description}
        path={chatMeta.path}
        image={`/api/og/generate?title=${encodeURIComponent(chatMeta.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${chatMeta.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column gap="12">
        <Heading variant="display-strong-l">Chat to Me</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          有想聊的项目、想法，或者只是想打个招呼？在这里写给我，内容会直接发送到我的邮箱，
          我看到后会尽快回复你。
        </Text>
      </Column>

      <Line background="neutral-alpha-medium" />

      <ChatForm />

      <Text variant="label-default-s" onBackground="neutral-weak">
        急事也可以直接加我微信（页脚微信图标悬浮可见二维码），或发邮件到 {person.email}。
      </Text>
    </Column>
  );
}
