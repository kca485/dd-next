import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tokenHash = url.searchParams.get("token_hash");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm?token_hash=${tokenHash}`,
  );

  console.log("res", res);
  if (!res.ok) {
    console.error("Auth response is not ok");
    redirect("login");
  }

  console.log("auth", res.json());
  redirect("/");
}
