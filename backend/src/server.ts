import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import authRoutes from "./routes/auth";
import patientRoutes from "./routes/patients";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);


connectDB();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
