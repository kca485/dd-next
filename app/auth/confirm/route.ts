import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tokenHash = url.searchParams.get("token_hash");
  await fetch(`http://localhost:4000/auth/confirm?token_hash=${tokenHash}`);
  redirect("/");
}
