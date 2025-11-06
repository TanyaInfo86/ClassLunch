import React, { useState } from "react";
import DashboardPage from "./pages/DashboardPage";


export default function App() {
  const [route, setRoute] = useState("dashboard");

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Облік відвідування та харчування</h1>
        <nav className="app-nav">
          <button onClick={() => setRoute("dashboard")}>Панель</button>
          <button onClick={() => setRoute("report")}>Звіти</button>
        </nav>
      </header>

      <main className="app-main">
        {route === "dashboard" ? <DashboardPage /> : <ReportPage />}
      </main>

      <footer className="app-footer">
        <small>Проєкт — демо. Дані зберігаються локально.</small>
      </footer>
    </div>
  );
}
