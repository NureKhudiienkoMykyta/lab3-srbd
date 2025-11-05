import { Router } from "express";
import { getAll } from "../controllers/subject.controller.js";

const router = Router();

router.get("/", getAll);

export default router;
