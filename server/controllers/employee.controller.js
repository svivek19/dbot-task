import employeeModel from "../models/employee.model.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, bankAccount, salary } = req.body;
    salary.netSalary =
      salary.basic + salary.hra - (salary.pf + salary.deductions);
    const emp = await employeeModel.create({
      name,
      email,
      phone,
      bankAccount,
      salary,
    });
    res.status(201).json(emp);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { salary } = req.body;
    salary.netSalary =
      salary.basic + salary.hra - (salary.pf + salary.deductions);
    const emp = await employeeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await employeeModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const response = await employeeModel.findById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
