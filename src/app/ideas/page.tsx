import { Column, Heading, Meta, Schema, Text, Tag, Row, Line } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";

const ideasMeta = {
  path: "/ideas",
  title: `Ideas – ${person.name}`,
  description: "我的想法与创意：关于 AtoA 时代、AI×心理学，以及 AI 的终局价值",
};

export async function generateMetadata() {
  return Meta.generate({
    title: ideasMeta.title,
    description: ideasMeta.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(ideasMeta.title)}`,
    path: ideasMeta.path,
  });
}

export default function Ideas() {
  return (
    <Column maxWidth="s" gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={ideasMeta.title}
        description={ideasMeta.description}
        path={ideasMeta.path}
        image={`/api/og/generate?title=${encodeURIComponent(ideasMeta.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${ideasMeta.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column gap="12">
        <Heading variant="display-strong-l">想法与创意</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          这里记录一些还在草稿阶段的思考——它们未必成熟，但代表我看待 AI 与未来的方式。
        </Text>
      </Column>

      <Line background="neutral-alpha-medium" />

      <Column gap="16">
        <Row gap="12" vertical="center">
          <Heading as="h2" variant="display-strong-s">
            AtoA：Agent to Agent 的时代
          </Heading>
          <Tag label="想法" variant="brand" />
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          被 AI 冲击的社会已经发生了巨大变化，而我相信未来是 AtoA 的——Agent to
          Agent。这个时代的趋势很明显：世界越来越快，什么都越来越快。人与人之间关系的推进也会越来越快，
          包括但不限于恋爱、工作、朋友。
        </Text>
        <Text variant="body-default-m" onBackground="neutral-medium">
          所以在未来（也许很遥远，也许很近），人们为了快速了解对方，会通过自己的 Agent
          去找到和 ta 相符的那个 Agent，让 Agent 帮你匹配适合你的人——coffee chat、寻找朋友、约会、寻找恋人。
        </Text>
        <Text variant="body-default-m" onBackground="neutral-medium">
          一个人的性格由先天和后天共同形成。要让匹配足够精准，AI 需要像一个真正喜欢你的伴侣那样去了解你：
          从出生年月与具体时间，到人生轨迹与历程——生命中的重大事件、转折点、普通经历，还有交友与家庭。
          对你的一切都感兴趣，让人们愿意和 AI 聊天。这样 AI 才能真正了解你，找人才会精准——甚至比你自己还了解你自己。
        </Text>
        <Text variant="body-default-m" onBackground="neutral-medium">
          我认为可以综合玄学、医疗、心理学等多个维度，形成多体系地探索一个人的内在本质。我很喜欢
          AdventureX 报名问卷的形式：它不直白地问最浅层的问题，而是更深入、更细致地探索一个人的观念、
          理性思维和逻辑能力。如果要做这样的产品，就应该做到这种深度。
        </Text>
      </Column>

      <Line background="neutral-alpha-medium" />

      <Column gap="16">
        <Row gap="12" vertical="center">
          <Heading as="h2" variant="display-strong-s">
            AI × 心理学
          </Heading>
          <Tag label="创意 · 草稿阶段" variant="neutral" />
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          想做一个 AI + 心理学的模块：通过外部硬件设备，自动分析一个人当前的心理状态。
        </Text>
        <Text variant="body-default-m" onBackground="neutral-medium">
          这个想法目前还在草稿阶段，没有太多具体构思——但它和上面 AtoA
          的方向是一体的：让 AI 从更多维度真正读懂一个人。
        </Text>
      </Column>

      <Line background="neutral-alpha-medium" />

      <Column gap="16">
        <Row gap="12" vertical="center">
          <Heading as="h2" variant="display-strong-s">
            AI 的终局：过滤噪声
          </Heading>
          <Tag label="职业观" variant="neutral" />
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          在信息变得如此臃肿和庞大的今天，我们每个人每天都要处理海量的信息：有些是有用的，有些是无用的，
          还有一些有用的信息，是裹挟着无用信息一起传过来的。人类一直在做两件相反的事——
          一边不断制造、扩大信息，一边又在费力地精简信息。
        </Text>
        <Text variant="body-default-m" onBackground="neutral-medium">
          现在我们有了 AI。它让生活方便了太多：一键开发、一键办公。但往内在想一层，AI
          真正在做的事，其实就是替我们完成信息的精简：一键开发，精简掉的是重复敲代码的环节，
          让人专注于架构设计与创意；一键办公，去掉的是那些繁琐而不必要的流程，
          让人直接面对结论和决策。
        </Text>
        <Text variant="body-default-m" onBackground="neutral-medium">
          我的工作也是同样的逻辑。我每天做的事，就是不断给业务里的信息做精简：
          把散落在各个部门的流程、数据、需求收拢起来，用自动化和 Agent 把噪声滤掉，
          让有效的信息直接流向该看到它的人。
        </Text>
        <Text variant="body-default-m" onBackground="neutral-medium">
          所以我理解的 AI 终局，不是替代人，而是成为人和信息之间的滤波器：
          世界的信息总量只会越来越大，但每个人真正需要面对的信息，应该越来越少、越来越准。
          谁能把噪声滤得更干净，谁就能把人的时间还给真正重要的事——思考、创造和决策。
        </Text>
      </Column>
    </Column>
  );
}
