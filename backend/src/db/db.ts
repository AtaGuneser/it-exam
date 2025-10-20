import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI!);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const getDB = (): Db => {
  if (!db) throw new Error("❌ DB not initialized. Call connectDB() first.");
  return db;
};

export const db = client.db("pms"); 
