import { Router } from "express";
import { getAll } from "../controllers/marksLog.controller.js";

const router = Router();

router.get("/", getAll);

export default router;
