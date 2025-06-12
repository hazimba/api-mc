import Employee from "../model/employee";

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

export const addEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  const { email, name, phone, position, department } = employee;

  if (!email || !name || !phone || !position || !department) {
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
    });

    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error });
  }
};
