import { Mail } from "lucide-react";
import type { PatientRowData } from "../columns";


interface Props {
  email: PatientRowData["email"];
}

export function EmailCell({ email }: Props) {
  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center gap-2 text-primary hover:underline"
    >
      <Mail className="w-4 h-4" />
      <span className="truncate">{email}</span>
    </a>
  );
}
