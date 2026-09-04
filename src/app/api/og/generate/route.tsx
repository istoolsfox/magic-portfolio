import { ImageResponse } from "next/og";
import { baseURL, person } from "@/resources";

export const runtime = "nodejs";

// 模块级字体缓存：进程内只下载一次，避免每次生成 OG 图都请求 Google Fonts
const fontCache = new Map<string, ArrayBuffer>();

async function loadGoogleFont(font: string): Promise<ArrayBuffer> {
  const cached = fontCache.get(font);
  if (cached) return cached;

  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${font}`)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      const data = await response.arrayBuffer();
      fontCache.set(font, data);
      return data;
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = (url.searchParams.get("title") || "Portfolio").slice(0, 120);

  // Geist 覆盖拉丁字符，Noto Sans SC 兜底中文，否则中文标题会渲染成方块
  const [latin, cjk] = await Promise.all([
    loadGoogleFont("Geist:wght@400"),
    loadGoogleFont("Noto+Sans+SC:wght@400"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "#151515",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4rem",
            fontStyle: "normal",
            color: "white",
          }}
        >
          <span
            style={{
              padding: "1rem",
              fontSize: "6rem",
              lineHeight: "8rem",
              letterSpacing: "-0.05em",
              whiteSpace: "wrap",
              textWrap: "balance",
              overflow: "hidden",
            }}
          >
            {title}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5rem",
            }}
          >
            <img
              src={baseURL + person.avatar}
              style={{
                width: "12rem",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "4.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                }}
              >
                {person.name}
              </span>
              <span
                style={{
                  fontSize: "2.5rem",
                  lineHeight: "2.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                  opacity: "0.6",
                }}
              >
                {person.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 720,
      fonts: [
        { name: "Geist", data: latin, style: "normal" },
        { name: "NotoSansSC", data: cjk, style: "normal" },
      ],
      headers: {
        // OG 图只由标题决定，可长缓存，减轻小内存服务器的重复生成压力
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    },
  );
}
