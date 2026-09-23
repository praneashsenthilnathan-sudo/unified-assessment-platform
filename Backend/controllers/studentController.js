const getStudentDashboard = (req, res) => {
  res.json({
    success: true,

    message: "Student dashboard data loaded successfully",

    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },

    stats: {
      availableAssessments: 3,
      completedAssessments: 0,
      averageScore: 0,
    },
  });
};

module.exports = {
  getStudentDashboard,
};