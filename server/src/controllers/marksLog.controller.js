import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const markLogRes = await pool.request()
      .query(`SELECT ml.markLog_id, s.first_name, s.last_name, ml.newmark, ml.oldmark, m.assessment_type, ml.modifyDate, sb.subject_name 
        FROM MarksLog ml
        JOIN Students s
        ON s.student_id = ml.student_id
        JOIN Marks m
        ON ml.mark_id = m.mark_id
        JOIN Subjects sb
        ON m.subject_id = sb.subject_id;`);

    const marklogs = markLogRes.recordset;

    if (marklogs.length === 0) {
      return res.status(404).json({ message: "Logs for marks not found" });
    }

    res.status(200).json(marklogs);
  } catch (error) {
    console.error("Error get log of marks", error);
    res.status(500).json({ message: "Server error. Error log of marks." });
  }
};
