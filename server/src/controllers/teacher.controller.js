import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const teachersRes = await pool.request()
      .query(`SELECT t.teacher_id, t.first_name, t.last_name, t.teacher_address, t.phone, t.email, t.degree, d.department_id, d.department_name 
        FROM Teachers t
        JOIN Departments d
        ON t.department_id = d.department_id;`);

    const teachers = teachersRes.recordset;

    if (teachers.length === 0) {
      return res.status(404).json({ message: "Teachers not found" });
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error get teachers", error);
    res.status(500).json({ message: "Server error. Error get teachers." });
  }
};
