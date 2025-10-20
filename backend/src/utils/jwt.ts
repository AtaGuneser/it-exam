import jwt from "jsonwebtoken";

export const signToken = (payload: object): string => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};
