import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/shared/data-table-column-header";
import { patientSchema } from "@/lib/schema/patient";
import { z } from "zod";

import { NameCell } from "./custom-cells/name-cell";
import { GenderCell } from "./custom-cells/gender-cell";
import { AddressCell } from "./custom-cells/address-cell";
import { MedicalHistoryCell } from "./custom-cells/medical-cell";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export type PatientRowData = z.infer<typeof patientSchema>;

export const patientColumns = (
  onEdit: (patient: PatientRowData) => void,
  onDelete: (id: string) => void
): ColumnDef<PatientRowData>[] => [
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
    {
      id: "actions",
      header: () => (
        <div className="text-center w-full font-medium">İşlemler</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2 h-full">
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-blue-50 cursor-pointer"
            onClick={() => onEdit(row.original)}
          >
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-red-50 cursor-pointer"
            onClick={() => {
              if (confirm("Bu hastayı silmek istediğinize emin misiniz?")) {
                onDelete(row.original._id!);
              }
            }}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 120, 
    }

  ];
