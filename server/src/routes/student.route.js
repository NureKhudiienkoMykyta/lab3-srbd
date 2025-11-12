import { Router } from "express";
import {
  countStudentInRegion,
  getAll,
  getStudentLogOffHours,
  getStudentsAvgMarkHigherThanMark,
  getStudentsByGroupId,
} from "../controllers/student.controller.js";

const router = Router();
router.get("/greater/:mark", getStudentsAvgMarkHigherThanMark);
router.get("/", getAll);
router.get("/log", getStudentLogOffHours);
router.get("/group/:id", getStudentsByGroupId);
router.get("/:region", countStudentInRegion);
export default router;
