import React from "react";
import styles from "./AddMark.module.css";
import { useState } from "react";
import api from "../../api/axiosClient";

function AddMark() {
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    mark: "",
    assessmentType: "",
    markDate: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await api.put("/marks", formData);
      setMessage(response?.data?.message);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <h1 className={styles.title}>
        Add or Update Mark by Student ID and Subject ID
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="student_id" className={styles.label}>
            Student ID:
          </label>
          <input
            className={styles.input}
            type="number"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            id="student_id"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="subject_id" className={styles.label}>
            Subject ID:
          </label>
          <input
            className={styles.input}
            type="number"
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            id="subject_id"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="mark" className={styles.label}>
            Mark:
          </label>
          <input
            className={styles.input}
            type="number"
            name="mark"
            value={formData.mark}
            onChange={handleChange}
            id="mark"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="assessmentType" className={styles.label}>
            Assessment Type:
          </label>
          <input
            className={styles.input}
            type="text"
            name="assessmentType"
            value={formData.assessmentType}
            onChange={handleChange}
            id="assessmentType"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="markDate" className={styles.label}>
            Date:
          </label>
          <input
            className={styles.input}
            type="date"
            name="markDate"
            value={formData.markDate}
            onChange={handleChange}
            id="markDate"
            required
          />
        </div>
        <div className={styles.buttonBlock}>
          <button className={styles.btn} type="submit">
            Send
          </button>
        </div>
        {message && <div className={styles.sucMessage}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
    </>
  );
}

export default AddMark;
