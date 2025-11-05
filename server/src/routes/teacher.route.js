import { Router } from "express";
import { getAll } from "../controllers/teacher.controller.js";

const router = Router();

router.get("/", getAll);

export default router;
