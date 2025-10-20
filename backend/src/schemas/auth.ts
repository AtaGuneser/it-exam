import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password too short"),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

