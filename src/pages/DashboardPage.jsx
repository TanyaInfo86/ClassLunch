import React from "react";
import StudentList from "../components/StudentList/StudentList";
import { useAttendance } from "../hooks/useAttendance";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const {
    students,
    dates,
    year,
    monthIndex,
    toggleAttendance,
    prevMonth,
    nextMonth,
  } = useAttendance();

  const monthName = new Date(year, monthIndex).toLocaleString("uk-UA", {
    month: "long",
  });

  // CSV
  const exportCSV = () => {
    const headers = ["Ім'я", "Відвідані дні", "Сума (грн)"];

    const rows = students.map((s) => {
      const totalDays = Object.values(s.attendance || {}).filter(Boolean).length;
      return [s.name, totalDays, totalDays * 25];
    });

    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_${year}_${monthIndex + 1}.csv`;
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        {/* <h1>📋 Облік відвідування</h1> */}

        <div className={styles.controls}>
          <button onClick={prevMonth}>⬅</button>

          <span>
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}
          </span>

          <button onClick={nextMonth}>➡</button>

          <button className={styles.exportBtn} onClick={exportCSV}>
            ⬇ CSV
          </button>
        </div>
      </div>

      <StudentList
        students={students}
        dates={dates}
        toggleAttendance={toggleAttendance}
      />
    </div>
  );
}
