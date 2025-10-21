import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTablePagination } from "@/components/tables/shared/data-table-pagination";
import { patientSchema } from "@/lib/schema/patient";
import { z } from "zod";
import CreatePatientModal from "@/components/modal/patient-create-modal";


export type PatientRowData = z.infer<typeof patientSchema>;

interface PatientsTableProps {
  columns: ColumnDef<PatientRowData>[];
  data: PatientRowData[];
}

export function PatientsTable({ columns, data }: PatientsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="p-4 w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Yeni Hasta
        </Button>
      </div>

      <div className="rounded-md border border-border/50 bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/10 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  Henüz kayıtlı hasta bulunmuyor.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>

      <CreatePatientModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
