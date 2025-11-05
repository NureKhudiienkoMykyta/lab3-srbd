import { Router } from "express";
import { getAll } from "../controllers/group.controller.js";

const router = Router();

router.get("/", getAll);

export default router;
