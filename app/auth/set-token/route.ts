import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json();
  const res = NextResponse.json({ ok: true });

  const cookieStore = await cookies();
  cookieStore.set("sb-access-token", accessToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
  });

  cookieStore.set("sb-refresh-token", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
  });
  console.log("sb refresh token", cookieStore.get("sb-refresh-token"));

  return res;
}
