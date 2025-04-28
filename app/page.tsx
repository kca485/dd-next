import { redirect } from "next/navigation";
import { GoogleMap } from "./google-map";
import { headers } from "next/headers";

export default async function Home() {
  const cookieHeader = (await headers()).get("cookie") ?? "";

  const authRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/session`,
    {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    },
  );

  if (!authRes.ok) {
    console.error("Session response is not ok");
    redirect("/login");
  }
  const authData = await authRes.json();
  if (!authData.user) {
    redirect("/login");
  }

  // Get places data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place`, {
    headers: {
      Accept: "application/json",
      cookie: cookieHeader,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Places response is not ok");
  }

  const data = (await res.json()) ?? [];

  const pois = data.map(
    (datum: { id: number; price: number; lat: number; lng: number }) => ({
      id: datum.id,
      price: datum.price,
      location: {
        lat: datum.lat,
        lng: datum.lng,
      },
    }),
  );

  return (
    <>
      <GoogleMap places={pois} />
    </>
  );
}
