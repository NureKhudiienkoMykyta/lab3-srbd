import { Router } from "express";
import { getAll } from "../controllers/subjectTeacher.controller.js";

const router = Router();

router.get("/", getAll);

export default router;
