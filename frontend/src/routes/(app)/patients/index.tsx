import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { PatientsTable } from "@/components/tables/patients/data-table";
import { patientQueryOptions } from "@/lib/query-options";
import { patientColumns } from "@/components/tables/patients/columns";
import { isAuthenticated } from "@/hooks/use-auth";


import { EditPatientModal } from "@/components/modal/patient-edit-modal";
import type { PatientRowData } from "@/lib/schema/patient";
import { deletePatient } from "@/lib/api/api";

export const Route = createFileRoute("/(app)/patients/")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: patients = [] } = useQuery(patientQueryOptions.getPatients());
  const [selectedPatient, setSelectedPatient] = useState<PatientRowData | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: () => {
      toast.success("Hasta silindi");
      queryClient.invalidateQueries({
        queryKey: patientQueryOptions.getPatients().queryKey,
      });
    },
    onError: () => toast.error("Silme işlemi başarısız!"),
  });


  const handleEdit = (patient: PatientRowData) => setSelectedPatient(patient);
  const handleDelete = (id: string) => {
    if (confirm("Bu hastayı silmek istediğinize emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="px-0 w-[93%] mx-auto py-4">
      <div className="bg-gradient-to-b from-primary/5 to-background p-0.5 rounded-xl shadow-md">
        <PatientsTable
          columns={patientColumns(handleEdit, handleDelete)}
          data={patients}
        />
      </div>

      {patients.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          Henüz kayıtlı hasta bulunmuyor.
        </div>
      )}

      {selectedPatient && (
        <EditPatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
