import { Router } from "express";
import {
  getAll,
  getStudentLogOffHours,
  getStudentsByGroupId,
} from "../controllers/student.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/log", getStudentLogOffHours);
router.get("/group/:id", getStudentsByGroupId);

export default router;
