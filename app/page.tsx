import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { MapWidget } from "@/components/feature/map-widget";
import { addPlace, deletePlace, editPlace } from "./actions";

export const runtime = "nodejs";

export default async function Home() {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  if (!cookieHeader) {
    console.error("no cookie found");
  }

  const authRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/session`,
    {
      headers: {
        Accept: "application/json",
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
    (datum: {
      id: number;
      price: number;
      lat: number;
      lng: number;
      picture_path?: string;
    }) => ({
      id: datum.id,
      price: datum.price,
      location: {
        lat: datum.lat,
        lng: datum.lng,
      },
      picturePath: datum.picture_path,
    }),
  );

  return (
    <>
      <MapWidget
        places={pois}
        onEditPlace={editPlace}
        onAddPlace={addPlace}
        onDeletePlace={deletePlace}
      />
    </>
  );
}
