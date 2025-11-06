// src/store/AttendanceContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import studentsData from "../data/students.json";
import { getWorkingDays } from "../hooks/useAttendance";

const AttendanceContext = createContext(null);

export function AttendanceProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);

  // ✅ Автоматично створюємо дати робочих днів поточного місяця
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const workingDates = getWorkingDays(year, month);
    setDates(workingDates);

    // Ініціалізуємо учнів
    const initializedStudents = studentsData.map((s) => ({
      ...s,
      attendance: {},
    }));
    setStudents(initializedStudents);
  }, []);

  // ✅ Зміна відвідування
  const toggleAttendance = (studentId, date) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const attendance = { ...s.attendance, [date]: !s.attendance?.[date] };
          return { ...s, attendance };
        }
        return s;
      })
    );
  };

  const value = { students, dates, toggleAttendance };
  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
}

export const useAttendance = () => {
  const ctx = useContext(AttendanceContext);
  if (!ctx)
    throw new Error("useAttendance must be used within AttendanceProvider");
  return ctx;
};
