import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import Table from "../../components/Table/Table";

function StudentsByGroup() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [marks, setMarks] = useState([]);
  const [loadingMarks, setLoadingMarks] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoadingStudents(true);
      try {
        const res = await api.get("/students");
        setStudents(Array.isArray(res.data) ? res.data : []);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setLoadingStudents(String(res.data[0].group_id));
        }
      } catch (err) {
        setError(err.message || "Failed to fetch students");
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, []);

  const handleFetchMarks = async () => {
    if (!selectedStudent) return;
    setLoadingMarks(true);
    setError(null);
    try {
      const res = await api.get(`/marks/${selectedStudent}`);
      setMarks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(
        err.response.data.message || "Failed to fetch marks for student"
      );
      setMarks([]);
    } finally {
      setLoadingMarks(false);
    }
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "black" }}>
        Оцінки за студентои
      </h2>

      {loadingStudents ? (
        <p>Завантаження студентів...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            style={{ padding: 8 }}
          >
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.first_name + " " + s.last_name}
              </option>
            ))}
          </select>
          <button onClick={handleFetchMarks} style={{ padding: "8px 12px" }}>
            Результат
          </button>
        </div>
      )}

      {loadingMarks ? (
        <p>Завантаження оцінок...</p>
      ) : (
        <div>
          {marks.length > 0 ? (
            <Table data={marks} />
          ) : (
            <p style={{ textAlign: "center", color: "black" }}>
              Немає оцінок у студента
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentsByGroup;
