import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
