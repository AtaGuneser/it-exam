import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  email?: string;
  role?: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = auth.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    // req.user = {
    //   id: payload.id,
    //   role: payload.role ?? "nurse",
    //   email: payload.email,
    // };

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
