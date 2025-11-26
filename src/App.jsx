import React, { useState } from "react";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [route, setRoute] = useState("dashboard");

  return (
    <div>
      <header>
        <h1>📋 Облік відвідування шкільної їдальні</h1>
      </header>

      {route === "dashboard" && <DashboardPage />}
    </div>
  );
}
