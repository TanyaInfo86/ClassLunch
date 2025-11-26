import { useEffect, useState } from "react";
import studentsData from "../data/students.json";
import { getWorkingDays } from "../utils/getWorkingDays";

export function useAttendance() {
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);

  const [year, setYear] = useState(() => {
    return Number(localStorage.getItem("year")) || new Date().getFullYear();
  });

  const [monthIndex, setMonthIndex] = useState(() => {
    return Number(localStorage.getItem("monthIndex")) || new Date().getMonth();
  });

  // ✔ генеруємо дні + завантажуємо студентів
  useEffect(() => {
    const workingDays = getWorkingDays(year, monthIndex);
    setDates(workingDays);

    const saved = localStorage.getItem("students-attendance");

    if (saved) {
      setStudents(JSON.parse(saved));
    } else {
      const loadedStudents = studentsData.map((s) => ({
        ...s,
        attendance: {},
      }));
      setStudents(loadedStudents);
    }
  }, [year, monthIndex]);

  // ✔ зберігаємо місяць
  useEffect(() => {
    localStorage.setItem("monthIndex", monthIndex);
    localStorage.setItem("year", year);
  }, [monthIndex, year]);

  // ✔ перемикаємо відвідування
  const toggleAttendance = (studentId, date) => {
    setStudents((prev) => {
      const updated = prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              attendance: {
                ...student.attendance,
                [date]: !student.attendance?.[date],
              },
            }
          : student
      );

      localStorage.setItem("students-attendance", JSON.stringify(updated));

      return updated;
    });
  };

  // ✔ навігація місяців
  const prevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex((m) => m + 1);
    }
  };

  return {
    students,
    dates,
    year,
    monthIndex,
    toggleAttendance,
    prevMonth,
    nextMonth,
  };
}
