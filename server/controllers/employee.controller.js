import employeeModel from "../models/employee.model.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, bankAccount, salary = {} } = req.body;

    const basic = +salary.basic || 0;
    const hra = +salary.hra || 0;
    const pf = +salary.pf || 0;
    const deductions = +salary.deductions || 0;

    const netSalary = basic + hra - (pf + deductions);

    const emp = await employeeModel.create({
      name,
      email,
      phone,
      bankAccount,
      salary: { ...salary, basic, hra, pf, deductions, netSalary },
    });

    return res.status(201).json(emp);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
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
    const { salary = {} } = req.body;

    const basic = Number(salary.basic) || 0;
    const hra = Number(salary.hra) || 0;
    const pf = Number(salary.pf) || 0;
    const deductions = Number(salary.deductions) || 0;

    const netSalary = basic + hra - (pf + deductions);

    req.body.salary = {
      ...salary,
      basic,
      hra,
      pf,
      deductions,
      netSalary,
    };

    const emp = await employeeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(emp);
  } catch (err) {
    console.error(err);
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
