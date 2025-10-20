import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { PatientsTable } from "@/components/tables/patients/data-table";
import { patientColumns } from "@/components/tables/patient-columns";
import { patientQueryOptions } from "@/lib/query/patient-query-options";
import { QUERY_KEYS } from "@/lib/queries/query-keys";

import { TableSkeleton } from "@/components/tables/shared/table-skeleton";
import FetchError from "@/components/tables/shared/fetch-error";

export const Route = createFileRoute("/(app)/patients/")({
  component: RouteComponent,
});

function RouteComponent() {

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery(patientQueryOptions.getPatients());


  if (isLoading) {
    return (
      <div className="px-6 py-4">
        <TableSkeleton />
      </div>
    );
  }
  if (error) {
    return (
      <div className="px-6 py-4">
        <FetchError />
      </div>
    );
  }

  const patients = data ?? [];
  const isEmpty = patients.length === 0;

  return (
    <div className="px-0 w-[93%] mx-auto py-4">
      <div className="bg-gradient-to-b from-primary/5 to-background p-0.5 rounded-xl shadow-md">
        <PatientsTable
          columns={patientColumns}
          data={patients}
          onRefresh={handleRefresh}
          isRefetching={isFetching}
        />
      </div>

      {isEmpty && (
        <div className="text-center py-6 text-muted-foreground">
          Henüz kayıtlı hasta bulunmuyor.
        </div>
      )}
    </div>
  );
}
