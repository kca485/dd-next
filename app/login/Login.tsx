"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendMagicLink } from "./actions";
import { useActionState } from "react";

export function Login() {
  const [_, formAction, isPending] = useActionState(sendMagicLink, undefined);
  return (
    <form
      action={formAction}
      className="border rounded-xl p-8 flex flex-col gap-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <Button disabled={isPending}>Log in</Button>
    </form>
  );
}
