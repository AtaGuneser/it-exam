import type { ColumnDef } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { z } from "zod";
import { patientSchema } from "@/lib/schema/patient";

export type PatientRowData = z.infer<typeof patientSchema>;

interface PatientsTableProps {
  columns: ColumnDef<PatientRowData>[];
  data: PatientRowData[];
  isRefetching?: boolean;
}

export function PatientsTable({
  columns,
  data,
}: PatientsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-card shadow-sm">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide text-xs whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`border-t border-border/30 hover:bg-muted/10 transition-colors ${rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-foreground whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  Henüz kayıtlı hasta bulunmuyor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
