"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function addPlace(formData: FormData) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place`, {
    method: "POST",
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
    body: formData,
  });
  revalidatePath("/");
}

export async function editPlace(formData: FormData, id: number) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place/${id}`, {
    method: "PUT",
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
    body: formData,
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
