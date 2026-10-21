"use client";

import { useEffect, useRef, useState } from "react";
import { Grid, Row, Text } from "@once-ui-system/core";
import Post from "./Post";

export type PostCard = {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    tag?: string;
  };
};

const CHUNK = 24;

/** 保持原版卡片视觉，但按需渲染：首屏 24 张，滚动接近底部自动追加（避免一次塞满全部） */
export function EarlierPosts({ items }: { items: PostCard[] }) {
  const [count, setCount] = useState(CHUNK);
  const sentinel = useRef<HTMLDivElement | null>(null);
  const done = count >= items.length;

  useEffect(() => {
    const el = sentinel.current;
    if (!el || done) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setCount((c) => Math.min(c + CHUNK, items.length));
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [done, items.length]);

  return (
    <>
      <Grid columns="2" s={{ columns: 1 }} fillWidth marginBottom="24" gap="16">
        {items.slice(0, count).map((p) => (
          <Post key={p.slug} post={p} thumbnail={false} />
        ))}
      </Grid>
      <div ref={sentinel} />
      {!done && (
        <Row fillWidth horizontal="center" marginBottom="40">
          <Text variant="label-default-s" onBackground="neutral-weak">
            已加载 {count} / {items.length} 篇 · 下滑自动加载
          </Text>
        </Row>
      )}
    </>
  );
}
