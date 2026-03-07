import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configuration } from "./src/config/env.js";
import { corsOptions } from "./src/config/cors.js";
import pool from "./src/config/database.js";

import projectRoutes from "./src/routes/projectRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

const app = express();
const PORT = configuration.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", date: new Date() });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

(async () => {
  try {
    await pool.query("SELECT 1");

    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the application:", error);
    process.exit(1);
  }
})();