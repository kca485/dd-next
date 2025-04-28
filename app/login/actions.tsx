"use server";

import { redirect } from "next/navigation";

export async function sendMagicLink(_: void, formData: FormData) {
  const data = {
    email: formData.get("email") as string,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Login response is not ok");
    redirect("/");
  }

  redirect("/sent");
}
