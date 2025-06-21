import Patient from "../models/patient.js";

export const getPatients = async (req, res) => {
  try {
    const patient = await Patient.find();

    if (!patient || patient.length === 0) {
      return res.status(404).json({ message: "No patient found." });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

export const addPatient = async (req, res) => {
  const patient = new Patient(req.body);

  const { username, password, email, age, address } = patient;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required." });
  }

  try {
    const newPatient = new Patient({
      username,
      password,
      email,
      age,
      address,
    });

    await newPatient.save();
    res
      .status(201)
      .json({ message: "Patient added successfully", patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error });
  }
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: "Patient ID is required." });
  }
  try {
    const updatePatient = await Patient.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatePatient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatePatient,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Patient ID is required." });
  }
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error });
  }
};
