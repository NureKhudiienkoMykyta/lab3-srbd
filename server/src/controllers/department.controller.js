import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const departmentsRes = await pool
      .request()
      .query("SELECT * FROM Departments;");

    const departments = departmentsRes.recordset;

    if (departments.length === 0) {
      return res.status(404).json({ message: "Departments not found" });
    }

    res.status(200).json(departments);
  } catch (error) {
    console.error("Error get departments", error);
    res.status(500).json({ message: "Server error. Error get departments." });
  }
};
