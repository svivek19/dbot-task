import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employee.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);

const { MONGODB_URI, PORT = 5050 } = process.env;

if (!MONGODB_URI) {
  console.error("  MONGODB_URI missing – check your .env file");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server ready at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
