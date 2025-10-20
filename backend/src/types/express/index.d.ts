import "express";

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      role: string;
      email?: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
