import { Router } from "express";
import departmentRouter from "./department.route.js";
import groupRouter from "./group.route.js";
import marksRouter from "./marks.route.js";
import marksLogRouter from "./marksLog.route.js";
import studentRouter from "./student.route.js";
import subjectRouter from "./subject.route.js";
import teacherRouter from "./teacher.route.js";
import subTeachRouter from "./subjectTeacher.route.js";

const router = Router();

router.use("/departments", departmentRouter);
router.use("/groups", groupRouter);
router.use("/marks", marksRouter);
router.use("/marks/log", marksLogRouter);
router.use("/students", studentRouter);
router.use("/subjects", subjectRouter);
router.use("/teachers", teacherRouter);
router.use("/subteach", subTeachRouter);

export default router;
