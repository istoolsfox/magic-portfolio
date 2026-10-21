"use client";

import { usePathname } from "next/navigation";
import { Column, SmartLink, Text } from "@once-ui-system/core";

export type SidebarGroup = {
  label: string;
  items: { slug: string; title: string }[];
};

export function BlogSidebarTree({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();
  // Next 的 usePathname 对非 ASCII 路径返回编码形态，比较前解码（与 [slug] decodeParam 同坑）
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    /* 保持原值 */
  }
  return (
    <Column gap="16">
      <SmartLink href="/blog">
        <Text
          variant="label-strong-s"
          onBackground={decoded === "/blog" ? "brand-weak" : "neutral-strong"}
        >
          全部文章
        </Text>
      </SmartLink>
      {groups.map((g) => (
        <Column key={g.label} gap="2">
          <Text variant="label-strong-s" onBackground="neutral-strong">
            {g.label} · {g.items.length}
          </Text>
          {g.items.map((it) => {
            const href = `/blog/${it.slug}`;
            const active = decoded === href;
            return (
              <SmartLink key={it.slug} href={href}>
                <Text
                  variant="body-default-xs"
                  onBackground={active ? "brand-weak" : "neutral-medium"}
                >
                  {active ? "● " : ""}
                  {it.title}
                </Text>
              </SmartLink>
            );
          })}
        </Column>
      ))}
    </Column>
  );
}
