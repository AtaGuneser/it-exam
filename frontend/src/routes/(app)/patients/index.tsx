import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { PatientsTable } from "@/components/tables/patients/data-table";
import { patientQueryOptions } from "@/lib/query-options";
import { patientColumns } from "@/components/tables/patients/columns";
import { isAuthenticated } from "@/hooks/use-auth";


export const Route = createFileRoute("/(app)/patients/")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {

  const {
    data,
    isFetching,
  } = useQuery(patientQueryOptions.getPatients());

  const patients = data ?? [];
  const isEmpty = patients.length === 0;

  return (
    <div className="px-0 w-[93%] mx-auto py-4">
      <div className="bg-gradient-to-b from-primary/5 to-background p-0.5 rounded-xl shadow-md">
        <PatientsTable
          columns={patientColumns}
          data={patients}
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
