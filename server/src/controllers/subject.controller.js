import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const subjectsRes = await pool.request().query(`SELECT * FROM Subjects;`);

    const subjects = subjectsRes.recordset;

    if (subjects.length === 0) {
      return res.status(404).json({ message: "Subjects not found" });
    }

    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error get subjects", error);
    res.status(500).json({ message: "Server error. Error get subjects." });
  }
};
