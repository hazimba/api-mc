import Employee from "../models/employee.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Employee ID is required." });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: "Employee ID is required." });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

export const addEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  const { email, name, phone, position, department, address } = employee;

  if (!email || !name || !phone || !position || !department || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingEmployee = await Employee.findOne({ email });
  if (existingEmployee) {
    return res
      .status(400)
      .json({ message: "Employee with this email already exists." });
  }
  try {
    const newEmployee = new Employee({
      email,
      name,
      phone,
      position,
      department,
      address,
    });

    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error });
  }
};
