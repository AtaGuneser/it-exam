import { createPatient, deletePatient, fetchPatientById, fetchPatients, updatePatient } from "@/lib/api/api";


export const patientQueryOptions = {
  getPatients: () => ({
    queryKey: ["patients"],
    queryFn: () => fetchPatients(),
  }),

  getPatientById: (id: string) => ({
    queryKey: ["patient", id],
    queryFn: () => fetchPatientById(id),
    enabled: !!id,
  }),

  createPatient: () => ({
    mutationFn: (data: any) => createPatient(data),
  }),

  updatePatient: (id: string) => ({
    mutationFn: (data: any) => updatePatient(id, data),
  }),

  deletePatient: (id: string) => ({
    mutationFn: () => deletePatient(id),
  }),
};
