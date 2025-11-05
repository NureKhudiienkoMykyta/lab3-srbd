import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const groupsRes = await pool.request()
      .query(`SELECT g.group_id, g.group_name, g.group_year, d.department_name 
        FROM Groups g
        JOIN Departments d
        ON g.department_id = d.department_id;`);

    const groups = groupsRes.recordset;

    if (groups.length === 0) {
      return res.status(404).json({ message: "Groups not found" });
    }

    res.status(200).json(groups);
  } catch (error) {
    console.error("Error get groups", error);
    res.status(500).json({ message: "Server error. Error get groups." });
  }
};
