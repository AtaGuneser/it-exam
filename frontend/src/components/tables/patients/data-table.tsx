"use client";

import { RefreshCw } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { motion, AnimatePresence, Transition } from "motion/react";

import { Table } from "@/components/ui/table";
import { DataTableHeader } from "@/components/ui/data-table-header";
import { DataTableBody } from "@/components/ui/data-table-body";
import { DataTableFooter } from "@/components/ui/data-table-footer";
import { TableToolbar } from "@/components/ui/table-toolbar";

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
  onRefresh?: () => void;
  isRefetching?: boolean;
}

const ANIMATION_CONFIG: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
};

export function PatientsTable({
  columns,
  data,
  onRefresh,
  isRefetching,
}: PatientsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = table
      .getAllLeafColumns()
      .findIndex((col) => col.id === active.id);
    const newIndex = table
      .getAllLeafColumns()
      .findIndex((col) => col.id === over.id);

    table.setColumnOrder((old) => arrayMove(old, oldIndex, newIndex));
  };

  return (
    <div className="w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <AnimatePresence>
          <motion.div
            layout="position"
            className="flex flex-col rounded-xl bg-background shadow-sm relative border border-border/50"
            transition={ANIMATION_CONFIG}
          >
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

            <TableToolbar
              stats={{ total: table.getRowModel().rows.length }}
              onRefresh={onRefresh}
              isRefetching={isRefetching}
            />

            <motion.div layout="position" className="overflow-auto p-2">
              <Table className="w-full">
                <DataTableHeader headerGroups={table.getHeaderGroups()} />
                <DataTableBody
                  rows={table.getRowModel().rows}
                  columns={columns.length}
                />
              </Table>
            </motion.div>

            <DataTableFooter
              totalRows={table.getRowModel().rows.length}
              label="Toplam Hasta"
            />
          </motion.div>
        </AnimatePresence>
      </DndContext>
    </div>
  );
}
