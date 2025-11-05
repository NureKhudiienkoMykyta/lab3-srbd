import { Router } from "express";
import { getAll, getMarksByStudentId } from "../controllers/mark.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getMarksByStudentId);

export default router;
