import express from "express";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controller/patient.js";

const router = express.Router();

router.get("/getPatients", getPatients);
router.post("/addPatient", addPatient);
router.patch("/updatePatient/:id", updatePatient);
router.delete("/deletePatient/:id", deletePatient);

export default router;
