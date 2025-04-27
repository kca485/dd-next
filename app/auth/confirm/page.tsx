import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const tokenHash = (await searchParams).token_hash;
  const confirmRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm?token_hash=${tokenHash}`,
  );

  const data = await confirmRes.json();

  const accessToken = data?.data?.session?.access_token;
  const refreshToken = data?.data?.session?.refresh_token;
  console.log("where am i");

  console.log(accessToken);
  console.log(refreshToken);

  if (accessToken && refreshToken) {
    await fetch(`http://localhost:3000/auth/set-token`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });
  }

  return (
    <>
      <h1>Confirmed</h1>
      <Link href="/">Go to home</Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>;
    </>
  );
}
