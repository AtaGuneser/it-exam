import { z } from "zod";

export const patientSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  medicalHistory: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});