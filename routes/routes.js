import express from "express";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controller/patient.js";

import {
  getEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployee,
} from "../controller/employee.js";

const router = express.Router();

router.get("/getPatients", getPatients);
router.post("/addPatient", addPatient);
router.patch("/updatePatient/:id", updatePatient);
router.delete("/deletePatient/:id", deletePatient);

router.get("/getEmployees", getEmployees);
router.get("/getEmployee/:id", getEmployeeById);
router.patch("/updateEmployee/:id", updateEmployee);
router.post("/addEmployee", addEmployee);

export default router;
