import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tokenHash = url.searchParams.get("token_hash");
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm?token_hash=${tokenHash}`,
  );
  redirect("/");
}
