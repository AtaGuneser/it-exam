import { MapPin } from "lucide-react";
import type { PatientRowData } from "../columns";


interface Props {
  address: PatientRowData["address"];
}

export function AddressCell({ address }: Props) {
  return (
    <div className="flex items-center gap-2 max-w-[200px] truncate">
      <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="truncate">{address}</span>
    </div>
  );
}
