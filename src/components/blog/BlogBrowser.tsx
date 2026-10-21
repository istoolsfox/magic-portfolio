"use client";

import { useMemo, useState } from "react";
import { Button, Column, Row, SmartLink, Text } from "@once-ui-system/core";

export type BlogItem = {
  slug: string;
  title: string;
  publishedAt: string;
  tag: string;
  summary: string;
};

// 门类固定排序；未列出的 tag 归入末尾（与 /blog/archive 目录页一致）
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

const PAGE_SIZE = 12;

export function BlogBrowser({ posts }: { posts: BlogItem[] }) {
  const [cat, setCat] = useState("全部");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of posts) m.set(p.tag, (m.get(p.tag) ?? 0) + 1);
    return m;
  }, [posts]);

  const cats = useMemo(() => {
    const keys = [...counts.keys()];
    keys.sort((a, b) => {
      const ia = GROUP_ORDER.indexOf(a);
      const ib = GROUP_ORDER.indexOf(b);
      return (
        (ia === -1 ? GROUP_ORDER.length : ia) -
          (ib === -1 ? GROUP_ORDER.length : ib) ||
        a.localeCompare(b, "zh")
      );
    });
    return keys;
  }, [counts]);

  const filtered = useMemo(
    () => (cat === "全部" ? posts : posts.filter((p) => p.tag === cat)),
    [posts, cat]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE
  );

  const pick = (c: string) => {
    setCat(c);
    setPage(1);
  };

  return (
    <Row fillWidth gap="24" wrap>
      {/* 左侧：门类目录 */}
      <Column gap="4" style={{ flex: "0 0 210px", minWidth: "200px" }} paddingLeft="24">
        <Text marginBottom="8" variant="label-strong-s" onBackground="neutral-strong">
          目录
        </Text>
        <SideLink
          label="全部"
          count={posts.length}
          active={cat === "全部"}
          onClick={() => pick("全部")}
        />
        {cats.map((c) => (
          <SideLink
            key={c}
            label={c}
            count={counts.get(c) ?? 0}
            active={cat === c}
            onClick={() => pick(c)}
          />
        ))}
      </Column>

      {/* 右侧：文章流 + 分页 */}
      <Column fillWidth gap="12" paddingRight="24">
        {pageItems.map((p) => (
          <SmartLink key={p.slug} href={`/blog/${p.slug}`}>
            <Column
              fillWidth
              padding="16"
              border="neutral-alpha-medium"
              radius="m"
            >
              <Row gap="12" vertical="center">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {p.publishedAt}
                </Text>
                <Text variant="label-default-s" onBackground="brand-weak">
                  {p.tag}
                </Text>
              </Row>
              <Text marginTop="4" variant="heading-strong-xs">
                {p.title}
              </Text>
              {p.summary && (
                <Text marginTop="4" variant="body-default-s" onBackground="neutral-medium">
                  {p.summary.length > 110
                    ? p.summary.slice(0, 110) + "…"
                    : p.summary}
                </Text>
              )}
            </Column>
          </SmartLink>
        ))}

        <Row fillWidth horizontal="between" vertical="center" marginTop="8">
          <Button
            variant="secondary"
            size="s"
            disabled={current <= 1}
            onClick={() => setPage(Math.max(1, current - 1))}
          >
            ← 上一页
          </Button>
          <Text variant="label-default-s" onBackground="neutral-weak">
            第 {current} / {totalPages} 页 · 共 {filtered.length} 篇
          </Text>
          <Button
            variant="secondary"
            size="s"
            disabled={current >= totalPages}
            onClick={() => setPage(Math.min(totalPages, current + 1))}
          >
            下一页 →
          </Button>
        </Row>
      </Column>
    </Row>
  );
}

function SideLink({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Row
      gap="8"
      vertical="center"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Text
        variant="label-default-s"
        onBackground={active ? "brand-weak" : "neutral-medium"}
      >
        {active ? "● " : ""}
        {label}
      </Text>
      <Text variant="label-default-xs" onBackground="neutral-weak">
        {count}
      </Text>
    </Row>
  );
}
