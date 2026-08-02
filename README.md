# Student Attendance System 📝

A lightweight backend service built with Node.js, Express and Prisma ORM to keep track of student attendance records stored in a PostgreSQL database.

## Features

- **Record Attendance:** Save daily attendance for students.
- **View All Records:** Fetch all attendance data or filter by status (`Present`, `Absent`, `Late`).
- **View Single Record:** Look up a specific record using its unique ID.
- **Simple Security:** Protects record creation using a token-based middleware.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database ORM:** Prisma v6
- **Database:** PostgreSQL (Neon / Supabase / Local)

---

## Setup Instructions

### 1. Clone & Install

Clone the repository to your machine and install the dependencies:

```bash
git clone <your-repository-url>
cd student-attendance-backend
npm install
```
