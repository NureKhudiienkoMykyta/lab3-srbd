import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./RootLayout";
import Main from "./pages/Main/Main";
import TablePage from "./pages/TablePage/TablePage";
import StudentsByGroup from "./pages/StudentsByGroup/StudentsByGroup";
import MarksByStudent from "./pages/MarksByStudent/MarksByStudent";
import StudentsLog from "./pages/StudentsLog/StudentsLog";
import AddMark from "./pages/AddMark/AddMark";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: "table/:type", element: <TablePage /> },
      { path: "table/students/by-group", element: <StudentsByGroup /> },
      { path: "table/marks/by-student", element: <MarksByStudent /> },
      { path: "table/studentslog", element: <StudentsLog /> },
      { path: "procedures/addMark", element: <AddMark /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
