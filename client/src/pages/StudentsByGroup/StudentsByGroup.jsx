import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import Table from "../../components/Table/Table";

function StudentsByGroup() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoadingGroups(true);
      try {
        const res = await api.get("/groups");
        setGroups(Array.isArray(res.data) ? res.data : []);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSelectedGroup(String(res.data[0].group_id));
        }
      } catch (err) {
        setError(err.message || "Failed to fetch groups");
      } finally {
        setLoadingGroups(false);
      }
    };

    fetchGroups();
  }, []);

  const handleFetchStudents = async () => {
    if (!selectedGroup) return;
    setLoadingStudents(true);
    setError(null);
    try {
      const res = await api.get(`/students/group/${selectedGroup}`);
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(
        err.response.data.message || "Failed to fetch students for group"
      );
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "black" }}>
        Студенти за групою
      </h2>

      {loadingGroups ? (
        <p>Завантаження груп...</p>
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
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{ padding: 8 }}
          >
            {groups.map((g) => (
              <option key={g.group_id} value={g.group_id}>
                {g.group_name}
              </option>
            ))}
          </select>
          <button onClick={handleFetchStudents} style={{ padding: "8px 12px" }}>
            Результат
          </button>
        </div>
      )}

      {loadingStudents ? (
        <p>Завантаження студентів...</p>
      ) : (
        <div>
          {students.length > 0 ? (
            <Table data={students} />
          ) : (
            <p style={{ textAlign: "center", color: "black" }}>
              Немає студентів для цієї групи
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentsByGroup;
