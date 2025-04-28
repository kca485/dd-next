import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("/auth/confirm route handler");
  const url = new URL(req.url);
  const tokenHash = url.searchParams.get("token_hash");
  if (!tokenHash) return NextResponse.redirect("/login");

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm?token_hash=${tokenHash}`,
    {
      headers: { cookie: req.headers.get("cookie") || "" },
      redirect: "manual",
    },
  );

  const res = NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);

  const setCookie = apiRes.headers.get("set-cookie");
  console.log("setCookie", setCookie);
  if (setCookie) {
    setCookie.split(/,\s*(?=[^ ]+=)/).forEach((c) => {
      res.headers.append("set-cookie", c);
    });
  }

  return res;
}
