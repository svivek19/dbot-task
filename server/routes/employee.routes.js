import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/employee/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
