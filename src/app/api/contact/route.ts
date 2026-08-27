import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Simple in-memory rate limit: max 5 requests per IP per 10 minutes
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
  try {
    const ip =
      request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for") || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "发送太频繁了，请稍后再试" }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, message } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "请填写称呼、邮箱和内容" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "邮箱格式不正确" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "内容过长" }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "邮件服务还没配置好，可以先通过微信或邮箱直接联系我" },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 465,
      secure: (Number(SMTP_PORT) || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"ToolsFox 网站来信" <${SMTP_USER}>`,
      to: CONTACT_TO || "toolsfox@qq.com",
      replyTo: email.trim(),
      subject: `[toolsfox.top] 来自 ${name.trim()} 的留言`,
      text: `称呼：${name.trim()}\n邮箱：${email.trim()}\n时间：${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}\n\n${message.trim()}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api error:", err);
    return NextResponse.json({ error: "发送失败，请稍后再试" }, { status: 500 });
  }
}
