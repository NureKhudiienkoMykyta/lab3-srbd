import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const marksRes = await pool.request()
      .query(`SELECT m.student_id, st.first_name, st.last_name, sb.subject_name, m.mark, m.mark_symb, m.date, m.assessment_type 
        FROM Marks m
        JOIN Students st
        ON st.student_id = m.student_id
        JOIN Subjects sb
        ON sb.subject_id = m.subject_id;`);

    const marks = marksRes.recordset;

    if (marks.length === 0) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.status(200).json(marks);
  } catch (error) {
    console.error("Error get marks", error);
    res.status(500).json({ message: "Server error. Error get marks." });
  }
};

export const getMarksByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;

    const pool = await connectToDB();
    const marksRes = await pool.request().input("studentId", studentId)
      .query(`SELECT m.student_id, st.first_name, st.last_name, sb.subject_name, m.mark, m.mark_symb, m.date, m.assessment_type 
        FROM Marks m
        JOIN Students st
        ON st.student_id = m.student_id
        JOIN Subjects sb
        ON sb.subject_id = m.subject_id
        WHERE m.student_id = @studentId;`);

    const marks = marksRes.recordset;

    if (marks.length === 0) {
      return res.status(404).json({ message: "Marks by studentId not found." });
    }

    res.status(200).json(marks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error get marks by students id" });
  }
};
