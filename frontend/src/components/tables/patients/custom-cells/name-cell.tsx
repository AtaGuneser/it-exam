import { UserCircle } from "lucide-react";
import type { PatientRowData } from "../columns";


interface Props {
  patient: PatientRowData;
}

export function NameCell({ patient }: Props) {
  return (
    <div className="flex items-center gap-2">
      <UserCircle className="w-5 h-5 text-primary/70 shrink-0" />
      <div className="flex flex-col">
        <span className="font-medium text-foreground">
          {patient.firstName} {patient.lastName}
        </span>
        <span className="text-xs text-muted-foreground">{patient.email}</span>
      </div>
    </div>
  );
}
