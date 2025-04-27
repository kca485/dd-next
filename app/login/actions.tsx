"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {

  const data = {
    email: formData.get("email") as string,
  };

  const res = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  console.log(res)
  // if (error) {
  //  redirect("/error");
  // }

  revalidatePath("/", "layout");
  redirect("/");
}

