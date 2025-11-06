import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AttendanceProvider } from "./store/AttendanceContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AttendanceProvider>
      <App />
    </AttendanceProvider>
  </React.StrictMode>
);
