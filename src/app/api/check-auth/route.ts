import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import * as cookie from "cookie";
import { tokenFor } from "@/utils/auth";

export async function GET(request: NextRequest) {
  const correctPassword = process.env.PAGE_ACCESS_PASSWORD;
  if (!correctPassword) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const provided = Buffer.from(String(cookies.authToken ?? ""));
  const expected = Buffer.from(tokenFor(correctPassword));

  if (provided.length === expected.length && timingSafeEqual(provided, expected)) {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
