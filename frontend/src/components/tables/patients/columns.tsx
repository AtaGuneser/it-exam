import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/tables/shared/data-table-column-header";
import { patientSchema } from "@/lib/schema/patient";

export type PatientRowData = z.infer<typeof patientSchema>;

export const patientColumns: ColumnDef<PatientRowData>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ad" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Soyad" />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cinsiyet" />
    ),
    cell: ({ row }) => {
      const gender = row.original.gender.toLowerCase();
      return (
        <span
          className={
            gender === "male"
              ? "text-blue-600 font-medium"
              : gender === "female"
              ? "text-pink-600 font-medium"
              : "text-muted-foreground"
          }
        >
          {gender === "male"
            ? "Erkek"
            : gender === "female"
            ? "Kadın"
            : "Belirtilmemiş"}
        </span>
      );
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Doğum Tarihi" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.dateOfBirth);
      return date.toLocaleDateString("tr-TR");
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefon" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-posta" />
    ),
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        className="text-primary hover:underline"
      >
        {row.original.email}
      </a>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Adres" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-ellipsis">
        {row.original.address}
      </div>
    ),
  },
  {
    accessorKey: "medicalHistory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tıbbi Geçmiş" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-ellipsis text-muted-foreground">
        {row.original.medicalHistory || "-"}
      </div>
    ),
  },
];
