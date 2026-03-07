import express from "express";
import {
  getProjectTasks,
  createTask,
  assignTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { auth } from "../middleware/auth.js";
// import role from "../middleware/role.js";

const router = express.Router();

router.get("/projects/:projectId/tasks", auth, getProjectTasks);
router.post("/projects/:projectId/tasks", auth, createTask);
router.post("/:id/assign", auth, assignTask);
router.patch("/:id/status", auth, updateTaskStatus);

export default router;