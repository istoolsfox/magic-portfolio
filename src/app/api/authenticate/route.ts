import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import * as cookie from "cookie";
import { tokenFor } from "@/utils/auth";

// 简单内存限速：每个 IP 10 分钟内最多尝试 5 次，防止密码暴力破解
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ message: "尝试过于频繁，请稍后再试" }, { status: 429 });
  }

  const body = await request.json();
  const { password } = body;
  const correctPassword = process.env.PAGE_ACCESS_PASSWORD;

  if (!correctPassword) {
    console.error("PAGE_ACCESS_PASSWORD environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  const expected = tokenFor(correctPassword);
  const provided = Buffer.from(tokenFor(String(password ?? "")));

  if (provided.length === expected.length && timingSafeEqual(provided, Buffer.from(expected))) {
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("authToken", expected, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      }),
    );

    return response;
  } else {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }
}
