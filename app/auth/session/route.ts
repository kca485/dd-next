import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/session`,
    {
      headers: { cookie },
      credentials: "include",
    },
  );

  const data = await apiRes.json();
  const res = NextResponse.json(data, { status: apiRes.status });

  const setCookie = apiRes.headers.get("set-cookie");
  if (setCookie) {
    setCookie.split(", ").forEach((c) => {
      res.headers.append("set-cookie", c);
    });
  }

  return res;
}
