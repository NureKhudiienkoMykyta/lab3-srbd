import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          marginLeft: "300px",
          background: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
