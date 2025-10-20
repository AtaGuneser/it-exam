import { RefreshCw } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import { motion, AnimatePresence } from "framer-motion";

export interface PatientRowData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  medicalHistory?: string;
  createdAt: string;
}

interface PatientsTableProps {
  columns: ColumnDef<PatientRowData>[];
  data: PatientRowData[];
  isRefetching?: boolean;
}

export function PatientsTable({ columns, data, isRefetching }: PatientsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-background shadow-sm">
      <AnimatePresence>
        {isRefetching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 backdrop-blur-sm bg-background/70 flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <RefreshCw className="h-6 w-6 animate-spin text-primary" />
              <p className="text-xs mt-2 text-muted-foreground">
                Yenileniyor...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 font-semibold text-muted-foreground">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-border/40 hover:bg-muted/10 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-muted-foreground">
                Henüz kayıtlı hasta bulunmuyor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
