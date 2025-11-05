import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/axiosClient";
import Table from "../../components/Table/Table";

function StudentsLog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/students/log`);

        setData(Array.isArray(response.data) ? response.data : []);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return (
      <div>
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ color: "black", textAlign: "center" }}>Students Logs</h2>
      <Table data={data} />
    </div>
  );
}

export default StudentsLog;
