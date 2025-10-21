import { FileText } from "lucide-react";
import type { PatientRowData } from "../columns";


interface Props {
  history?: PatientRowData["medicalHistory"];
}

export function MedicalHistoryCell({ history }: Props) {
  return (
    <div className="flex items-center gap-2 max-w-[220px] truncate text-sm text-muted-foreground">
      <FileText className="w-4 h-4" />
      <span>{history || "—"}</span>
    </div>
  );
}
