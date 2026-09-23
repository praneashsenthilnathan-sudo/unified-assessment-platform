import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Student User",
    email: "student@uap.com",
    role: "Student",
    status: "Active",
  },
  {
    id: 2,
    name: "Instructor User",
    email: "instructor@uap.com",
    role: "Instructor",
    status: "Active",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@uap.com",
    role: "Admin",
    status: "Active",
  },
];

const assessments = [
  {
    id: 1,
    title: "Python Programming Assessment",
    instructor: "Instructor User",
    category: "Programming",
    status: "Published",
  },
  {
    id: 2,
    title: "Artificial Intelligence Basics",
    instructor: "Instructor User",
    category: "AI",
    status: "Published",
  },
  {
    id: 3,
    title: "Web Development Assessment",
    instructor: "Instructor User",
    category: "Web Development",
    status: "Draft",
  },
];

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [userSearch, setUserSearch] = useState("");
  const [assessmentSearch, setAssessmentSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      const searchMatch =
        item.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        item.email.toLowerCase().includes(userSearch.toLowerCase());

      const roleMatch =
        roleFilter === "All" || item.role === roleFilter;

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      return searchMatch && roleMatch && statusMatch;
    });
  }, [userSearch, roleFilter, statusFilter]);

  const filteredAssessments = assessments.filter((item) => {
    return (
      item.title.toLowerCase().includes(assessmentSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(assessmentSearch.toLowerCase()) ||
      item.instructor.toLowerCase().includes(assessmentSearch.toLowerCase())
    );
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const changeSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">

        <div className="flex h-16 items-center justify-between px-4 sm:px-6">

          <div>
            <h1 className="text-lg font-bold text-indigo-600 sm:text-xl">
              Unified Assessment
            </h1>

            <p className="text-[10px] text-slate-500 sm:text-xs">
              Admin Portal
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            <button
              onClick={() => navigate("/notifications")}
              className="rounded-lg p-2 text-lg transition hover:bg-slate-100"
              title="Notifications"
            >
              🔔
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100 sm:px-3 sm:py-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white sm:h-9 sm:w-9">
                {(user.name || "A").charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold">
                  {user.name || "Administrator"}
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </button>

          </div>

        </div>

      </header>

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* ================= DESKTOP SIDEBAR ================= */}

        <aside className="hidden w-64 border-r border-slate-200 bg-white md:block">

          <div className="p-4">

            <nav className="space-y-2">

              <button
                onClick={() => changeSection("dashboard")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${
                  activeSection === "dashboard"
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                🏠
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => changeSection("users")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${
                  activeSection === "users"
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                👥
                <span>User Management</span>
              </button>

              <button
                onClick={() => changeSection("assessments")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${
                  activeSection === "assessments"
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                📝
                <span>Assessments</span>
              </button>

              <button
                onClick={() => changeSection("reports")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${
                  activeSection === "reports"
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                📊
                <span>Reports & Logs</span>
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 hover:bg-slate-100"
              >
                👤
                <span>Profile</span>
              </button>

              <button
                onClick={() => navigate("/notifications")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 hover:bg-slate-100"
              >
                🔔
                <span>Notifications</span>
              </button>

              <button
                onClick={() => changeSection("settings")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${
                  activeSection === "settings"
                    ? "bg-indigo-50 font-semibold text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                ⚙️
                <span>Platform Settings</span>
              </button>

            </nav>

            {/* LOGOUT */}

            <div className="mt-8 border-t border-slate-200 pt-4">

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50"
              >
                🚪
                <span>Logout</span>
              </button>

            </div>

          </div>

        </aside>

        {/* ================= MAIN ================= */}

        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 md:pb-6">

          <div className="mx-auto max-w-7xl">

            {/* ================= DASHBOARD ================= */}

            {activeSection === "dashboard" && (
              <>
                <section className="mb-8">

                  <p className="mb-2 text-sm font-medium text-indigo-600">
                    Administration
                  </p>

                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Welcome back, {user.name || "Administrator"} 👋
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Manage users, assessments, reports and platform settings.
                  </p>

                </section>

                {/* STATS */}

                <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Total Users
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-indigo-600 sm:text-3xl">
                      56
                    </h3>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Students
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
                      52
                    </h3>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Instructors
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-purple-600 sm:text-3xl">
                      3
                    </h3>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Assessments
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-orange-500 sm:text-3xl">
                      3
                    </h3>
                  </div>

                </section>

                {/* QUICK ACTIONS */}

                <section className="mb-10">

                  <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                    Administration Tools
                  </h2>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    <button
                      onClick={() => changeSection("users")}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-indigo-300 hover:shadow-md sm:p-5"
                    >
                      <div className="text-2xl">
                        👥
                      </div>

                      <h3 className="mt-3 text-sm font-bold sm:text-base">
                        Manage Users
                      </h3>

                      <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                        Manage student and instructor accounts.
                      </p>
                    </button>

                    <button
                      onClick={() => changeSection("assessments")}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-indigo-300 hover:shadow-md sm:p-5"
                    >
                      <div className="text-2xl">
                        📝
                      </div>

                      <h3 className="mt-3 text-sm font-bold sm:text-base">
                        Assessments
                      </h3>

                      <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                        Review platform assessments.
                      </p>
                    </button>

                    <button
                      onClick={() => changeSection("reports")}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-indigo-300 hover:shadow-md sm:p-5"
                    >
                      <div className="text-2xl">
                        📊
                      </div>

                      <h3 className="mt-3 text-sm font-bold sm:text-base">
                        Reports & Logs
                      </h3>

                      <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                        Monitor platform activity.
                      </p>
                    </button>

                    <button
                      onClick={() => changeSection("settings")}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-indigo-300 hover:shadow-md sm:p-5"
                    >
                      <div className="text-2xl">
                        ⚙️
                      </div>

                      <h3 className="mt-3 text-sm font-bold sm:text-base">
                        Platform Settings
                      </h3>

                      <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                        Configure platform preferences.
                      </p>
                    </button>

                  </div>

                </section>
              </>
            )}

            {/* ================= USERS ================= */}

            {activeSection === "users" && (
              <section>

                <div className="mb-6">

                  <h2 className="text-2xl font-bold">
                    User Management
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage users, roles and account status.
                  </p>

                </div>

                <div className="mb-5 flex flex-col gap-3 sm:flex-row">

                  <input
                    type="text"
                    placeholder="🔍 Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />

                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                  >
                    <option value="All">
                      All Roles
                    </option>

                    <option value="Student">
                      Student
                    </option>

                    <option value="Instructor">
                      Instructor
                    </option>

                    <option value="Admin">
                      Admin
                    </option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">

                  <table className="w-full min-w-[700px] text-left text-sm">

                    <thead className="border-b border-slate-200 bg-slate-50">

                      <tr>
                        <th className="px-5 py-4 font-semibold">
                          Name
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          Email
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          Role
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          Status
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          Action
                        </th>
                      </tr>

                    </thead>

                    <tbody>

                      {filteredUsers.map((item) => (

                        <tr
                          key={item.id}
                          className="border-b border-slate-100"
                        >

                          <td className="px-5 py-4 font-medium">
                            {item.name}
                          </td>

                          <td className="px-5 py-4 text-slate-500">
                            {item.email}
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                              {item.role}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                              {item.status}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <button className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium hover:bg-slate-50">
                              Manage
                            </button>
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </section>
            )}

            {/* ================= ASSESSMENTS ================= */}

            {activeSection === "assessments" && (
              <section>

                <div className="mb-6">

                  <h2 className="text-2xl font-bold">
                    Assessment Oversight
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review assessments created across the platform.
                  </p>

                </div>

                <input
                  type="text"
                  placeholder="🔍 Search assessments..."
                  value={assessmentSearch}
                  onChange={(e) => setAssessmentSearch(e.target.value)}
                  className="mb-5 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                  {filteredAssessments.map((assessment) => (

                    <div
                      key={assessment.id}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >

                      <div className="flex items-start justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                          📝
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            assessment.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {assessment.status}
                        </span>

                      </div>

                      <h3 className="mt-4 font-bold">
                        {assessment.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {assessment.category}
                      </p>

                      <p className="mt-3 text-sm text-slate-500">
                        Instructor: {assessment.instructor}
                      </p>

                      <button className="mt-5 w-full rounded-lg border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 hover:bg-indigo-50">
                        Review Assessment
                      </button>

                    </div>

                  ))}

                </div>

              </section>
            )}

            {/* ================= REPORTS ================= */}

            {activeSection === "reports" && (
              <section>

                <div className="mb-6">

                  <h2 className="text-2xl font-bold">
                    Reports & Activity Logs
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Monitor platform activity and system information.
                  </p>

                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                      Login Activity
                    </p>

                    <p className="mt-3 text-3xl font-bold">
                      128
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                      Recent activities
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                      Assessments Taken
                    </p>

                    <p className="mt-3 text-3xl font-bold">
                      87
                    </p>

                    <p className="mt-1 text-xs text-indigo-600">
                      Platform activity
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                      Submissions
                    </p>

                    <p className="mt-3 text-3xl font-bold">
                      74
                    </p>

                    <p className="mt-1 text-xs text-purple-600">
                      Recorded submissions
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                      System Status
                    </p>

                    <p className="mt-3 text-xl font-bold text-green-600">
                      Healthy
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      All services operational
                    </p>
                  </div>

                </div>

                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">

                  <h3 className="font-bold">
                    Recent Activity
                  </h3>

                  <div className="mt-5 space-y-4">

                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <span className="text-xl">
                        🔐
                      </span>

                      <div>
                        <p className="text-sm font-medium">
                          User login activity recorded
                        </p>

                        <p className="text-xs text-slate-500">
                          Authentication event
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <span className="text-xl">
                        📝
                      </span>

                      <div>
                        <p className="text-sm font-medium">
                          New assessment published
                        </p>

                        <p className="text-xs text-slate-500">
                          Assessment activity
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        👤
                      </span>

                      <div>
                        <p className="text-sm font-medium">
                          New user registered
                        </p>

                        <p className="text-xs text-slate-500">
                          User management activity
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

              </section>
            )}

            {/* ================= SETTINGS ================= */}

            {activeSection === "settings" && (
              <section>

                <div className="mb-6">

                  <h2 className="text-2xl font-bold">
                    Platform Settings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Configure your administrator preferences.
                  </p>

                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                  <div className="rounded-xl border border-slate-200 bg-white p-6">

                    <h3 className="text-lg font-bold">
                      Appearance
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Change the platform appearance.
                    </p>

                    <button
                      onClick={() => navigate("/settings")}
                      className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                      Open Appearance Settings
                    </button>

                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-6">

                    <h3 className="text-lg font-bold">
                      Profile & Security
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage administrator profile information.
                    </p>

                    <button
                      onClick={() => navigate("/profile")}
                      className="mt-5 w-full rounded-lg border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      Open Profile
                    </button>

                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-6">

                    <h3 className="text-lg font-bold">
                      Role Management
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage Student, Instructor and Admin roles.
                    </p>

                    <button
                      onClick={() => changeSection("users")}
                      className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-50"
                    >
                      Manage Roles
                    </button>

                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-6">

                    <h3 className="text-lg font-bold">
                      Notifications
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      View platform notifications.
                    </p>

                    <button
                      onClick={() => navigate("/notifications")}
                      className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-50"
                    >
                      View Notifications
                    </button>

                  </div>

                </div>

              </section>
            )}

          </div>

        </main>

      </div>

      {/* ================= MOBILE NAV ================= */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-lg backdrop-blur md:hidden">

        <div className="mx-auto flex max-w-md items-center justify-around">

          <button
            onClick={() => changeSection("dashboard")}
            className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1 text-indigo-600"
          >
            <span className="text-lg">
              🏠
            </span>

            <span className="text-[10px] font-semibold">
              Home
            </span>
          </button>

          <button
            onClick={() => changeSection("users")}
            className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1 text-slate-500"
          >
            <span className="text-lg">
              👥
            </span>

            <span className="text-[10px] font-semibold">
              Users
            </span>
          </button>

          <button
            onClick={() => changeSection("assessments")}
            className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1 text-slate-500"
          >
            <span className="text-lg">
              📝
            </span>

            <span className="text-[10px] font-semibold">
              Tests
            </span>
          </button>

          <button
            onClick={() => changeSection("reports")}
            className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1 text-slate-500"
          >
            <span className="text-lg">
              📊
            </span>

            <span className="text-[10px] font-semibold">
              Reports
            </span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1 text-slate-500"
          >
            <span className="text-lg">
              👤
            </span>

            <span className="text-[10px] font-semibold">
              Profile
            </span>
          </button>

        </div>

      </nav>

    </div>
  );
}

export default AdminDashboard;