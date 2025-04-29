import { LoginForm } from "@/components/feature/login-form";
import { sendMagicLink } from "./actions";

export default async function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoginForm onSubmit={sendMagicLink} />
    </div>
  );
}
