import React from "react";
import { useState } from "react";
import api from "../../api/axiosClient";
import Table from "../../components/Table/Table";

function EverySeconderyStudent() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mark, setMark] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/students/greater/${mark}`);
      const studentsData = Array.isArray(response?.data?.students)
        ? response?.data?.students
        : [];
      setData(studentsData);
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
        Table function every second student whose average mark greater then
        value
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="mark"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#333",
              minWidth: "80px",
            }}
          >
            Mark:
          </label>
          <input
            type="number"
            id="mark"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            required
            style={{
              padding: "10px 12px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              flex: "1",
              maxWidth: "200px",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: "10px 24px",
              fontSize: "16px",
              fontWeight: "600",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Send
          </button>
        </div>
      </form>
      {error ? (
        <p style={{ color: "#d32f2f", fontSize: "16px", padding: "10px" }}>
          {error}
        </p>
      ) : loading ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
            padding: "20px",
          }}
        >
          Loading...
        </div>
      ) : (
        <Table data={data} />
      )}
    </div>
  );
}

export default EverySeconderyStudent;
