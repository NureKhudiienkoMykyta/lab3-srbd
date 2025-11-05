import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        {/* === Таблиці === */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Таблиці</div>
          <ul className={styles.sectionList}>
            <li>
              <Link to="/table/departments">Departments</Link>
            </li>
            <li>
              <Link to="/table/groups">Groups</Link>
            </li>
            <li>
              <Link to="/table/marks">Marks</Link>
            </li>
            <li>
              <Link to="/table/students">Students</Link>
            </li>
            <li>
              <Link to="/table/subjects">Subjects</Link>
            </li>
            <li>
              <Link to="/table/teachers">Teachers</Link>
            </li>
            <li>
              <Link to="/table/subteach">Subject_Teacher</Link>
            </li>
            <li>
              <Link to="/table/markslog">MarksLog</Link>
            </li>
            <li>
              <Link to="/table/studentslog">Students Logs</Link>
            </li>
            <li>
              <Link to="/table/students/by-group">Students by group</Link>
            </li>
            <li>
              <Link to="/table/marks/by-student">Marks by student</Link>
            </li>
          </ul>
        </div>

        {/* === Процедури === */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Процедури</div>
          <ul className={styles.sectionList}>
            <li>
              <Link to="/procedures/addProduct">AddProduct</Link>
            </li>
            <li>
              <Link to="/procedures/deleteSale">DeleteSale</Link>
            </li>
          </ul>
        </div>

        {/* === Функції === */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Функції</div>
          <ul className={styles.sectionList}>
            <li>
              <Link to="/functions/countProducts">CountProductsInCategory</Link>
            </li>
            <li>
              <Link to="/functions/topSelling">GetTopSellingProducts</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
