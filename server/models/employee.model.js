import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  bankAccount: String,
  salary: {
    basic: Number,
    hra: Number,
    pf: Number,
    deductions: Number,
    netSalary: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Employee", employeeSchema);
