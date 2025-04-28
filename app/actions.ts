"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface PlaceBody {
  lat: number;
  lng: number;
  price: number;
}
export async function addPlace(body: PlaceBody) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
    },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  revalidatePath("/");
}

export async function editPlace(body: PlaceBody, id: number) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
    },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  revalidatePath("/");
}

export async function deletePlace(id: number) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
    },
    cache: "no-store",
  });
  revalidatePath("/");
}
