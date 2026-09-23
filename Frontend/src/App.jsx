import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Dashboards
import StudentDashboard from "./pages/student_dashboard";
import InstructorDashboard from "./pages/instructor_dashboard";
import AdminDashboard from "./pages/admin_dashboard";

// Assessment
import Assessment from "./pages/Assessment";

// Common Pages
import Results from "./pages/Results";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== AUTHENTICATION ==================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* ==================== STUDENT ==================== */}

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />


        {/* ==================== COMMON PAGES ==================== */}

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />


        {/* ==================== INSTRUCTOR ==================== */}

        <Route
          path="/instructor-dashboard"
          element={<InstructorDashboard />}
        />


        {/* ==================== ADMIN ==================== */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />


        {/* ==================== INVALID ROUTE ==================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;