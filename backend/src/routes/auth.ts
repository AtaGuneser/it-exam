import { Router, Request, Response } from "express";

import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { getDB } from "../db/db";
import { loginSchema, registerSchema } from "../schemas/auth";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ errors: parse.error.flatten().fieldErrors });
    }

    const { name, email, password } = parse.data;
    const db = getDB();
    const existing = await db.collection("users").findOne({ email });

    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await hashPassword(password);

    const result = await db.collection("users").insertOne({
        name,
        email,
        password: hashed,
    });

    res.status(201).json({
        message: "User registered successfully",
        userId: result.insertedId,
    });
});

router.post("/login", async (req: Request, res: Response) => {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ errors: parse.error.flatten().fieldErrors });
    }

    const { email, password } = parse.data;
    const db = getDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id, email: user.email });

    res.json({
        message: "Login successful",
        token,
    });
});

export default router;
