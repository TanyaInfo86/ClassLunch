import React from "react";
import styles from "./StudentList.module.css";

const DAY_PRICE = 25;

export default function StudentList({ students, dates, toggleAttendance }) {
  // Якщо дані ще не прийшли
  if (!students.length || !dates.length)
    return <p className={styles.empty}>Завантаження даних...</p>;

  // Беремо місяць з першої дати
  const firstDate = new Date(dates[0]);
  const month = firstDate.toLocaleString("uk-UA", { month: "long" });

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.monthTitle}>
        {month.charAt(0).toUpperCase() + month.slice(1)}
      </h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Учень</th>

            {dates.map((d) => {
              const date = new Date(d);
              const weekday = date.toLocaleString("uk-UA", { weekday: "short" });
              return (
                <th key={d}>
                  {date.getDate()}
                  <br />
                  {weekday}
                </th>
              );
            })}

            <th>Всього днів</th>
            <th>Сума (грн)</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => {
            let totalDays = 0;

            return (
              <tr key={student.id}>
                <td>{student.name}</td>

                {dates.map((d) => {
                  const attended = student.attendance?.[d];
                  if (attended) totalDays++;
                  return (
                    <td
                      key={d}
                      className={`${styles.cell} ${
                        attended ? styles.active : ""
                      }`}
                      onClick={() => toggleAttendance(student.id, d)}
                    >
                      {attended ? "➕" : ""}
                    </td>
                  );
                })}

                <td className={styles.total}>{totalDays}</td>
                <td className={styles.money}>{totalDays * DAY_PRICE}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
