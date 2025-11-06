// src/utils/getWorkingDays.js
export function getWorkingDays(year, monthIndex) {
    const dates = [];
    const date = new Date(year, monthIndex, 1);
  
    while (date.getMonth() === monthIndex) {
      const day = date.getDay(); // 0 = неділя, 6 = субота
      if (day !== 0 && day !== 6) {
        dates.push(date.toISOString()); // ISO рядки зручно використовувати як ключі
      }
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }
  