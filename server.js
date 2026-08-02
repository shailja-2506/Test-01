const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("./middleware/auth");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/attendance", authMiddleware, async (req, res) => {
  try {
    const { studentName, rollNumber, attendanceDate, status } = req.body;

    if (!studentName || !rollNumber || !attendanceDate || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["Present", "Absent", "Late"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const parsedDate = new Date(attendanceDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const record = await prisma.attendance.create({
      data: {
        studentName,
        rollNumber,
        attendanceDate: parsedDate,
        status,
      },
    });

    return res.status(201).json(record);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const records = await prisma.attendance.findMany({
      where: filter,
      orderBy: {
        attendanceDate: "desc",
      },
    });

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/attendance/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await prisma.attendance.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
