import { Router } from "express";
import {
  getAll,
  getMarksByStudentId,
  insertMarkProcedure,
} from "../controllers/mark.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getMarksByStudentId);
router.put("/", insertMarkProcedure);

export default router;
