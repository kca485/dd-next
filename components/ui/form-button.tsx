"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function FormButton({ ...props }: React.ComponentProps<typeof Button>) {
  const status = useFormStatus();
  return <Button {...props} disabled={status.pending} />;
}
