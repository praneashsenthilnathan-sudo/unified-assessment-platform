const express = require("express");
const cors = require("cors");

require("./config/database");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

/* =========================
   CORS
========================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Unified Assessment Platform Backend is running 🚀",
    database: "SQLite",
  });
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy ✅",
  });
});

/* =========================
   SERVER
========================= */

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("==========================================");
  console.log(" Unified Assessment Platform Backend");
  console.log("==========================================");
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Network: http://YOUR-LAPTOP-IP:${PORT}`);
  console.log("==========================================");
});