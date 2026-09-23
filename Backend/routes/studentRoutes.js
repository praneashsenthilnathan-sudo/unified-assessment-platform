const express = require("express");

const authenticateToken = require("../middlewares/authMiddleware");

const {
  getStudentDashboard,
} = require("../controllers/studentController");

const router = express.Router();

router.get(
  "/dashboard",
  authenticateToken,
  getStudentDashboard
);

module.exports = router;