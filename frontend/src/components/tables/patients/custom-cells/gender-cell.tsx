import { Venus, Mars, Circle } from "lucide-react";
import type { PatientRowData } from "../columns";

interface Props {
  gender: PatientRowData["gender"];
}

export function GenderCell({ gender }: Props) {
  const g = gender.toLowerCase();
  const color =
    g === "male" ? "text-blue-600" : g === "female" ? "text-pink-600" : "text-muted-foreground";
  const Icon = g === "male" ? Mars : g === "female" ? Venus : Circle;

  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className={`font-medium ${color}`}>
        {g === "male" ? "Erkek" : g === "female" ? "Kadın" : "Belirtilmemiş"}
      </span>
    </div>
  );
}
