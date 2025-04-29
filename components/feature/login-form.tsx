import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/ui/form-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function LoginForm({
  onSubmit,
}: {
  onSubmit(formData: FormData): Promise<void>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="flex flex-col gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <FormButton>Submit</FormButton>
        </form>
      </CardContent>
    </Card>
  );
}
