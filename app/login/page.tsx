import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendMagicLink } from "./actions";
import { headers } from "next/headers";

export default async function Page() {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <form className="border rounded-xl p-8 flex flex-col gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <Button formAction={sendMagicLink}>Log in</Button>
        </form>
      </div>
      <p>observer: {cookieHeader}</p>
    </div>
  );
}
