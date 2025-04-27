import { redirect } from "next/navigation";
import { GoogleMap } from "./google-map";

export default async function Home() {
  // Get user
  const authRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!authRes.ok) {
    console.error("Response is not ok");
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
    },
  });
  if (!res.ok) {
    console.error("Response is not ok");
  }

  const data = (await res.json()) ?? [];
  console.log(data);

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
