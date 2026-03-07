import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configuration } from "./src/config/env.js";
import { corsOptions } from "./src/config/cors.js";
import pool from "./src/config/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import volunteerRoutes from "./src/routes/volunteerRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import errorMiddleware from "./src/middleware/error.js";
import authRoutes from "./src/routes/authRoutes.js";


const app = express();
const PORT = configuration.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

app.use("/api/projects", projectRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);


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

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});