import { z } from "zod";

export const createPatientSchema = z.object({
  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(1, "lastName is required"),
  dateOfBirth: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" }),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().min(5),
  email: z.string().email(),
  address: z.string().min(1),
  medicalHistory: z.string().optional().nullable(),
});
