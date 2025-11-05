import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const studentsRes = await pool.request()
      .query(`SELECT s.student_id, s.first_name, s.last_name, s.student_address, s.phone, s.email, g.group_id, g.group_name, s.student_description, s.scholarship
         FROM Students s
         JOIN Groups g
         ON s.group_id = g.group_id;`);

    const students = studentsRes.recordset;

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "Students not found for this group" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error get students", error);
    res.status(500).json({ message: "Server error. Error get students." });
  }
};

export const getStudentLogOffHours = async (req, res) => {
  try {
    const pool = await connectToDB();
    const studentLogRes = await pool
      .request()
      .query(`SELECT * FROM OffHoursStudentLog;`);
    const studentsLog = studentLogRes.recordset;

    if (studentsLog.length === 0) {
      return res
        .status(404)
        .json({ message: "Students` logs not found for this group" });
    }

    res.status(200).json(studentsLog);
  } catch (error) {
    console.error("Error get students` log");
    res.status(500).json({ message: "Server error. Error get students` log" });
  }
};

export const getStudentsByGroupId = async (req, res) => {
  try {
    const groupId = req.params.id;

    const pool = await connectToDB();

    const studentRes = await pool.request().input("groupId", groupId).query(`
        SELECT s.student_id, s.first_name, s.last_name, s.student_address, 
               s.phone, s.email, g.group_id, g.group_name, 
               s.student_description, s.scholarship
        FROM Students s
        JOIN Groups g ON s.group_id = g.group_id
        WHERE s.group_id = @groupId;
      `);

    const students = studentRes.recordset;

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "Students not found for this group" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error. Error get students by groupId" });
  }
};
