"use client";

import { useEffect, useState } from "react";
import { Column, Text } from "@once-ui-system/core";

export type CatItem = { label: string; count: number };

/** 列表页左栏：门类目录，点击即筛选右侧文章流（事件同步给 EarlierPosts） */
export function CategoryNav({ cats, total }: { cats: CatItem[]; total: number }) {
  const [active, setActive] = useState("全部");

  const pick = (label: string) => {
    setActive(label);
    window.dispatchEvent(new CustomEvent("blog-cat", { detail: label }));
  };

  return (
    <Column gap="12">
      <Text variant="label-strong-s" onBackground="neutral-strong">
        目录
      </Text>
      <div className="blog-toc-list">
        <CatRow
          label={`全部 · ${total}`}
          active={active === "全部"}
          onClick={() => pick("全部")}
        />
        {cats.map((c) => (
          <CatRow
            key={c.label}
            label={`${c.label} · ${c.count}`}
            active={active === c.label}
            onClick={() => pick(c.label)}
          />
        ))}
      </div>
    </Column>
  );
}

function CatRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={"blog-toc-item" + (active ? " active" : "")}
      onClick={onClick}
      role="button"
    >
      {label}
    </div>
  );
}
