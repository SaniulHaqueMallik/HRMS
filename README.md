# HRMS (Human Resource Management System)

A lightweight web-based HRMS application that allows an admin to manage employees and track daily attendance.

This project demonstrates full-stack development skills using **React** for the frontend and **Django** for the backend, with a deployed solution ready for production.

---

## 🌐 Live URLs

- **Frontend (Vercel):** [https://hrms-frontend-t5a1.vercel.app/](https://hrms-frontend-t5a1.vercel.app/)
- **Backend API (Render):** [https://hrmsbackend-lxwl.onrender.com/](https://hrmsbackend-lxwl.onrender.com/)

---

## 🛠 Tech Stack

**Frontend:**

- React (Create React App)
- Axios (for API calls)
- HTML & CSS (simple, professional layout)

**Backend:**

- Python 3
- Django 5
- Django REST Framework (API)
- SQLite (default, can switch to PostgreSQL if needed)

**Deployment:**

- Frontend: Vercel
- Backend: Render

---

## ⚙ Features

### Employee Management

- Add new employee with:
  - Employee ID (unique)
  - Full Name
  - Email
  - Department
- View all employees
- Delete employees

### Attendance Management

- Mark attendance for employees with:
  - Date
  - Status (Present / Absent)
- View attendance records
- Delete attendance records
- Filter attendance by date
- Total present days per employee

### UI / UX

- Clean layout with tables and forms
- Loading states, empty states, and error handling
