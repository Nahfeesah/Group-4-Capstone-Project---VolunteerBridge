import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProjectStatus,
} from "../controllers/project.controller.js";
import { auth } from "../middleware/auth.js";
// import role from "../middleware/role.js";

const router = express.Router();

router.get("/", auth, getProjects);
router.get("/:id", auth, getProjectById);
router.post("/", auth, createProject);
router.patch("/:id/status", auth, updateProjectStatus);

export default router;