// src/lib/api/patients.ts

import axios from "axios";
import { patientSchema } from "../schema/patient";
import { useAuthStore } from "@/store/auth-store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tüm hastaları getir
export async function fetchPatients() {
  const { data } = await api.get("/patients");

  const parsed = patientSchema.array().safeParse(data.patients);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid patients response");
  }

  return parsed.data;
}

// Tek hasta getir (id ile)
export async function fetchPatientById(id: string) {
  const { data } = await api.get(`/patients/${id}`);

  const parsed = patientSchema.safeParse(data.patient);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid patient response");
  }

  return parsed.data;
}

// Yeni hasta oluştur
export async function createPatient(formData: unknown) {
  const parsed = patientSchema.safeParse(formData);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid patient data before sending");
  }

  const { data } = await api.post("/patients", parsed.data);

  const validated = patientSchema.safeParse(data.patient);
  if (!validated.success) {
    throw new Error("Invalid response after patient creation");
  }

  return validated.data;
}

// Hasta güncelle
export async function updatePatient(id: string, updates: unknown) {
  const parsed = patientSchema.partial().safeParse(updates);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid update data");
  }

  const { data } = await api.put(`/patients/${id}`, parsed.data);

  const validated = patientSchema.safeParse(data.patient);
  if (!validated.success) {
    throw new Error("Invalid response after update");
  }

  return validated.data;
}

// Hasta sil
export async function deletePatient(id: string) {
  const { data } = await api.delete(`/patients/${id}`);
  return data.message; // "Patient deleted successfully"
}
