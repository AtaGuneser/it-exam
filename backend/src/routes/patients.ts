import { Router, Request, Response } from "express";
import { authenticate } from "../middlewares/auth";
import { getDB } from "../db/db";
import { createPatientSchema } from "../schemas/patient";
import { ObjectId } from "mongodb";

const router = Router();

/**
 * POST /api/patients
 * New Patient
 */
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const parsed = createPatientSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return res.status(400).json({ errors });
    }
    const data = parsed.data;

    const dob = new Date(data.dateOfBirth);
    if (isNaN(dob.getTime()))
      return res.status(400).json({ message: "Invalid dateOfBirth" });

    const db = getDB();
    const patientsColl = db.collection("patients");

    const exists = await patientsColl.findOne({ email: data.email });
    if (exists)
      return res
        .status(409)
        .json({ message: "Patient with same email already exists" });

    const now = new Date();
    const insertDoc = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: dob,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      address: data.address,
      medicalHistory: data.medicalHistory ?? null,
      createdAt: now,
      updatedAt: now,
    };

    const result = await patientsColl.insertOne(insertDoc);
    const patient = await patientsColl.findOne({ _id: result.insertedId });

    return res.status(201).json({ message: "Patient created", patient });
  } catch (err) {
    console.error("POST /api/patients error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/patients
 * All Patients
 */
router.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const patientsColl = db.collection("patients");

    const patients = await patientsColl
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ patients });
  } catch (err) {
    console.error("GET /api/patients error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/patients/:id
 * Get Single Patient
 */
router.get("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const db = getDB();
    const patientsColl = db.collection("patients");

    const patient = await patientsColl.findOne({ _id: new ObjectId(id) });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({ patient });
  } catch (err) {
    console.error("GET /api/patients/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/patients/:id
 * Update Patient
 */
router.put("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const parsed = createPatientSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return res.status(400).json({ errors });
    }

    const data = parsed.data;
    if (data.dateOfBirth && isNaN(new Date(data.dateOfBirth).getTime())) {
      return res.status(400).json({ message: "Invalid dateOfBirth" });
    }

    const db = getDB();
    const patientsColl = db.collection("patients");

    const existing = await patientsColl.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updated = await patientsColl.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth)
            : existing.dateOfBirth,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    return res.status(200).json({
      message: "Patient updated successfully",
      patient: updated?.value,
    });
  } catch (err) {
    console.error("PUT /api/patients/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/patients/:id
 * Delete Patient
 */
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const db = getDB();
    const patientsColl = db.collection("patients");

    const existing = await patientsColl.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patientsColl.deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/patients/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
