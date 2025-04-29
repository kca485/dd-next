import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { sendMagicLink } from "./actions";
import { FormButton } from "@/components/ui/form-button";

export function Login() {
  return (
    <form
      action={sendMagicLink}
      className="border rounded-xl p-8 flex flex-col gap-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <FormButton>Log in</FormButton>
    </form>
  );
}
