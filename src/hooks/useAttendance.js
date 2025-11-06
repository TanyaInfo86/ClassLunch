// src/hooks/useAttendance.js

// ✅ Отримати робочі дні місяця (без субот і неділь)
export function getWorkingDays(year, monthIndex) {
  const dates = [];
  const date = new Date(year, monthIndex, 1);

  while (date.getMonth() === monthIndex) {
    const day = date.getDay(); // 0 = неділя, 6 = субота
    if (day !== 0 && day !== 6) {
      // зберігаємо формат YYYY-MM-DD
      dates.push(date.toISOString().split("T")[0]);
    }
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

// ✅ Підрахунок кількості відвіданих днів
export function countDaysPresent(student) {
  if (!student.attendance) return 0;
  return Object.values(student.attendance).filter(Boolean).length;
}

// ✅ Обчислення вартості місяця для учня
export function calculateMonthlyCost(student, foodCostPerDay = 25) {
  const daysPresent = countDaysPresent(student);
  return daysPresent * foodCostPerDay;
}

// ✅ Експорт CSV (звіт)
export function exportCSV(students) {
  const headers = ["Name", "Days Present", "Total Cost"];
  const rows = students.map((s) => [
    s.name,
    countDaysPresent(s),
    calculateMonthlyCost(s),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "attendance_report.csv");
  link.click();
}
