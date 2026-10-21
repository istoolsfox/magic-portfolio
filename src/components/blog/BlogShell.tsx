"use client";

import type { ReactNode } from "react";

/** 博客左栏壳：桌面 sticky 常驻，移动端折叠为顶部目录 */
export function BlogShell({
  aside,
  summary,
  children,
}: {
  aside: ReactNode;
  summary: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      <div className="blog-aside-desktop">{aside}</div>
      <div className="blog-aside-mobile">
        <details>
          <summary>{summary}</summary>
          {aside}
        </details>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}
