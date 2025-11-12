import React from "react";
import { useState } from "react";
import api from "../../api/axiosClient";

function CountStudentsRegion() {
  const [region, setRegion] = useState("");
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    try {
      const response = await api.get(`/students/${region}`);
      setCount(response.data.count);
    } catch (error) {
      setError(error?.response?.data?.message || "Error get count students");
    }
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>
        Scalar Function get count students by region
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label
            style={{ color: "black", fontSize: "24px", marginBottom: "10px" }}
            htmlFor="region"
          >
            Region:
          </label>
          <input
            type="text"
            name="region"
            id="region"
            placeholder="Харків"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            style={{ fontSize: "20px" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <button style={{ backgroundColor: "green" }} type="submit">
            Send
          </button>
        </div>
        {count !== null && count !== undefined && (
          <p style={{ color: "black", fontSize: "20px" }}>
            Count students in {region}: {count}
          </p>
        )}
        {error && <p style={{ color: "red", fontSize: "18px" }}>{error}</p>}
      </form>
    </div>
  );
}

export default CountStudentsRegion;
