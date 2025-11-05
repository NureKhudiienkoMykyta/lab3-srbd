import { connectToDB } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const pool = await connectToDB();
    const subTeachRes = await pool.request()
      .query(`SELECT sb.subject_name, t.first_name, t.last_name, t.email
        FROM Subject_teacher st
        JOIN Subjects sb ON sb.subject_id = st.subject_id
        JOIN Teachers t ON t.teacher_id = st.teacher_id;`);

    const subTeach = subTeachRes.recordset;

    if (subTeach.length === 0) {
      return res.status(404).json({ message: "Subject_teacher not found" });
    }

    res.status(200).json(subTeach);
  } catch (error) {
    console.error("Error get subject teacher", error);
    res.json({ message: "Server error. Error get subject teacher." });
  }
};
