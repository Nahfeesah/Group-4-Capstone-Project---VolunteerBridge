import express from "express";
import { systemReport } from "../controllers/report.controller.js";

const router = express.Router();

router.get("/system", systemReport);

export default router;