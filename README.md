# ClassLunch

---

## 🇬🇧 English — Project README

### Overview

**ClassLunch** is a lightweight React web app for tracking student attendance and calculating monthly lunch fees. It helps teachers and school administrators mark daily presence, apply monthly subscription fees (fixed or per-student variable), compute monthly totals, and export reports for accounting.

### Key Features

- Add / edit / remove students
- Daily attendance marking (calendar / month grid)
- Monthly calculation: `total = monthlyFee + daysPresent * pricePerDay`
- Per-student monthly fee (overrides default) or default monthly fee
- Export summary CSV report for a selected month
- Local persistence via `localStorage` (optionally backend-ready)

### Tech Stack

- React (Vite)
- JavaScript (no TypeScript)
- CSS Modules for component styles
- Context + reducer (simple global state) — can be swapped for Redux/Zustand
- Optional: SheetJS / jsPDF for advanced export

### Project Structure

src/
├─ components/
│ ├─ AddStudentForm.jsx
│ ├─ AddStudentForm.module.css
│ ├─ StudentList.jsx
│ ├─ StudentList.module.css
│ ├─ AttendanceTable.jsx
│ ├─ AttendanceTable.module.css
│ ├─ ReportSummary.jsx
│ ├─ ReportSummary.module.css
├─ hooks/
│ └─ useAttendance.js
├─ pages/
│ ├─ DashboardPage.jsx
│ ├─ DashboardPage.module.css
│ ├─ ReportPage.jsx
│ ├─ ReportPage.module.css
├─ store/
│ └─ attendanceSlice.js
├─ App.jsx
├─ main.jsx
└─ index.css
public/
├─ favicon-16x16.png
├─ favicon-32x32.png
├─ apple-touch-icon.png
└─ site.webmanifest

bash
Копіювати код

### Getting Started (Development)

1. Clone repo:

```bash
git clone https://github.com/yourusername/classlunch.git
cd classlunch
Install dependencies:

bash
Копіювати код
npm install
Start dev server:

bash
Копіювати код
npm run dev
Open http://localhost:5173 (or address shown by Vite).

Build & Deploy
bash
Копіювати код
npm run build
# Deploy contents of /dist to hosting (Netlify, Vercel, static server)
Configuration & Notes
Default monthly fee and price-per-day are stored in app settings (Report page).

Each student may have their own abonement (monthly fee). If not set, default is used.

Attendance is stored as { "YYYY-MM-DD": true/false } per student.

CSV export available on Report page; can be extended to Excel / PDF.

Where to put favicon & meta
Place favicon files in public/ and add to index.html head:

html
Копіювати код
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#007577">
Recommended Next Steps
Add authentication (for teacher / accountant roles) and a backend (Node + MongoDB or Firebase) for multi-device sync and backups.

Add import/export full JSON backup.

Add PDF/Excel export (SheetJS / jsPDF).

Add validations and accessibility improvements.

License
MIT — see LICENSE file.

Contact
Project author / maintainer: Your Name — your.email@example.com
```
