// import React, { useEffect, useState } from "react";
// import StudentList from "../components/StudentList/StudentList";
// import { getWorkingDays } from "../utils/getWorkingDays";
// import studentsData from "../data/students.json";

// export default function DashboardPage() {
//   const [students, setStudents] = useState([]);
//   const [dates, setDates] = useState([]);

//   useEffect(() => {
//     // Поточний рік і місяць
//     const now = new Date();
//     const year = now.getFullYear();
//     const monthIndex = now.getMonth();

//     // Генеруємо лише робочі дні
//     const workingDays = getWorkingDays(year, monthIndex);
//     setDates(workingDays);

//     // Завантажуємо учнів із JSON (сталий список)
//     const loadedStudents = studentsData.map((s) => ({
//       ...s,
//       attendance: {}, // Порожня відмітка на початку
//     }));
//     setStudents(loadedStudents);
//   }, []);

//   // Функція перемикання "відвідав/не відвідав"
//   const toggleAttendance = (studentId, date) => {
//     setStudents((prev) =>
//       prev.map((student) =>
//         student.id === studentId
//           ? {
//               ...student,
//               attendance: {
//                 ...student.attendance,
//                 [date]: !student.attendance?.[date],
//               },
//             }
//           : student
//       )
//     );
//   };

//   return (
//     <div className="dashboard">
//       <h2>📋 Облік відвідування та харчування</h2>
//       <StudentList
//         students={students}
//         dates={dates}
//         toggleAttendance={toggleAttendance}
//       />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import StudentList from "../components/StudentList/StudentList";
import { getWorkingDays } from "../utils/getWorkingDays";
import studentsData from "../data/students.json";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  // 👉 Генеруємо лише робочі дні для вибраного місяця
  useEffect(() => {
    const workingDays = getWorkingDays(year, monthIndex);
    setDates(workingDays);

    const loadedStudents = studentsData.map((s) => ({
      ...s,
      attendance: {},
    }));
    setStudents(loadedStudents);
  }, [year, monthIndex]);

  // 👉 Перемикання відвідування
  const toggleAttendance = (studentId, date) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              attendance: {
                ...student.attendance,
                [date]: !student.attendance?.[date],
              },
            }
          : student
      )
    );
  };

  // 👉 Зміна місяця
  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
    if (monthIndex === 0) setYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    if (monthIndex === 11) setYear((prev) => prev + 1);
  };

  // 👉 Експорт у CSV
  const exportCSV = () => {
    const headers = ["Ім'я", "Відвідані дні", "Сума (грн)"];
    const rows = students.map((s) => {
      const totalDays = Object.values(s.attendance || {}).filter(Boolean).length;
      return [s.name, totalDays, totalDays * 25];
    });
    const csvContent = [headers, ...rows]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_${year}_${monthIndex + 1}.csv`;
    link.click();
  };

  const monthName = new Date(year, monthIndex).toLocaleString("uk-UA", {
    month: "long",
  });

  return (
    <div className={styles.container}>
      {/* 🔹 Верхня панель */}
      <div className={styles.topBar}>
        <h1>📋 Облік відвідування та харчування</h1>
        <div className={styles.controls}>
          <button onClick={handlePrevMonth}>⬅ Попередній</button>
          <span>
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}
          </span>
          <button onClick={handleNextMonth}>Наступний ➡</button>
          <button className={styles.exportBtn} onClick={exportCSV}>
            ⬇ Звіт CSV
          </button>
        </div>
      </div>

      {/* 🔹 Таблиця */}
      <StudentList
        students={students}
        dates={dates}
        toggleAttendance={toggleAttendance}
      />
    </div>
  );
}
