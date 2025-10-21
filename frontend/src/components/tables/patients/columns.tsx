import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/shared/data-table-column-header";
import { patientSchema } from "@/lib/schema/patient";
import { z } from "zod";

import { NameCell } from "./custom-cells/name-cell";
import { GenderCell } from "./custom-cells/gender-cell";
import { EmailCell } from "./custom-cells/mail-cell";
import { AddressCell } from "./custom-cells/address-cell";
import { MedicalHistoryCell } from "./custom-cells/medical-cell";

export type PatientRowData = z.infer<typeof patientSchema>;

export const patientColumns: ColumnDef<PatientRowData>[] = [
  {
    id: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hasta" />,
    cell: ({ row }) => <NameCell patient={row.original} />,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cinsiyet" />,
    cell: ({ row }) => <GenderCell gender={row.original.gender} />,
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Doğum Tarihi" />,
    cell: ({ row }) => {
      const date = new Date(row.original.dateOfBirth);
      return (
        <span className="text-muted-foreground text-sm">
          {date.toLocaleDateString("tr-TR")}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="E-posta" />,
    cell: ({ row }) => <EmailCell email={row.original.email} />,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Adres" />,
    cell: ({ row }) => <AddressCell address={row.original.address} />,
  },
  {
    accessorKey: "medicalHistory",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tıbbi Geçmiş" />,
    cell: ({ row }) => (
      <MedicalHistoryCell history={row.original.medicalHistory} />
    ),
  },
];
