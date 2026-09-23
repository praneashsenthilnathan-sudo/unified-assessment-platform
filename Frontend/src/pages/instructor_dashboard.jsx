import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const assessments = [
  {
    id: 1,
    title: "Python Programming Assessment",
    category: "Programming",
    questions: 10,
    duration: 30,
    status: "Published",
    students: 32,
  },
  {
    id: 2,
    title: "Artificial Intelligence Basics",
    category: "AI",
    questions: 15,
    duration: 40,
    status: "Published",
    students: 24,
  },
  {
    id: 3,
    title: "Web Development Assessment",
    category: "Web Development",
    questions: 20,
    duration: 45,
    status: "Draft",
    students: 0,
  },
];

function InstructorDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(search.toLowerCase()) ||
      assessment.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || assessment.status === filter;

    return matchesSearch && matchesFilter;
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToAssessments = () => {
    document
      .getElementById("assessments")
      ?.scrollIntoView({ behavior: "smooth" });
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
              Instructor Portal
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            {/* Notifications */}

            <button
              onClick={() => navigate("/notifications")}
              className="rounded-lg p-2 text-lg transition hover:bg-slate-100"
              title="Notifications"
            >
              🔔
            </button>

            {/* Profile */}

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100 sm:px-3 sm:py-2"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white sm:h-9 sm:w-9">
                {(user.name || "I").charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold">
                  {user.name || "Instructor"}
                </p>

                <p className="text-xs text-slate-500">
                  Instructor
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

              {/* Dashboard */}

              <button
                onClick={() => navigate("/instructor-dashboard")}
                className="flex w-full items-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 text-left font-semibold text-indigo-600"
              >
                🏠
                <span>Dashboard</span>
              </button>

              {/* Assessments */}

              <button
                onClick={goToAssessments}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                📝
                <span>Assessments</span>
              </button>

              {/* Results */}

              <button
                onClick={() => navigate("/results")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                📊
                <span>Results</span>
              </button>

              {/* History */}

              <button
                onClick={() => navigate("/history")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                🕘
                <span>History</span>
              </button>

              {/* Profile */}

              <button
                onClick={() => navigate("/profile")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                👤
                <span>Profile</span>
              </button>

              {/* Notifications */}

              <button
                onClick={() => navigate("/notifications")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                🔔
                <span>Notifications</span>
              </button>

              {/* Settings */}

              <button
                onClick={() => navigate("/settings")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                ⚙️
                <span>Settings</span>
              </button>

            </nav>

            {/* Logout */}

            <div className="mt-8 border-t border-slate-200 pt-4">

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
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

            {/* Welcome */}

            <section className="mb-8">

              <p className="mb-2 text-sm font-medium text-indigo-600">
                Instructor Dashboard
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Welcome back, {user.name || "Instructor"} 👋
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Create assessments, manage students and evaluate submissions.
              </p>

            </section>

            {/* ================= STATS ================= */}

            <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <p className="text-xs text-slate-500 sm:text-sm">
                  Total Assessments
                </p>

                <h3 className="mt-2 text-2xl font-bold text-indigo-600 sm:text-3xl">
                  3
                </h3>

              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <p className="text-xs text-slate-500 sm:text-sm">
                  Published
                </p>

                <h3 className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
                  2
                </h3>

              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <p className="text-xs text-slate-500 sm:text-sm">
                  Students
                </p>

                <h3 className="mt-2 text-2xl font-bold text-purple-600 sm:text-3xl">
                  56
                </h3>

              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <p className="text-xs text-slate-500 sm:text-sm">
                  Pending Evaluation
                </p>

                <h3 className="mt-2 text-2xl font-bold text-orange-500 sm:text-3xl">
                  12
                </h3>

              </div>

            </section>

            {/* ================= QUICK ACTIONS ================= */}

            <section className="mb-10">

              <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <button
                  onClick={goToAssessments}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">
                    ➕
                  </div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    Create Assessment
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    Create a new assessment.
                  </p>
                </button>

                <button
                  onClick={() => navigate("/results")}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">
                    📊
                  </div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    View Results
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    Review assessment performance.
                  </p>
                </button>

                <button
                  onClick={() => navigate("/history")}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">
                    🕘
                  </div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    History
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    View previous assessment activity.
                  </p>
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">
                    ⚙️
                  </div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    Settings
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    Manage appearance and preferences.
                  </p>
                </button>

              </div>

            </section>

            {/* ================= ASSESSMENTS ================= */}

            <section id="assessments">

              <div className="mb-5">

                <h2 className="text-xl font-bold sm:text-2xl">
                  My Assessments
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your created assessments.
                </p>

              </div>

              {/* Search */}

              <div className="mb-5 flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  placeholder="🔍 Search assessments..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none sm:w-48"
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>
                </select>

              </div>

              {/* Cards */}

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                {filteredAssessments.map((assessment) => (

                  <div
                    key={assessment.id}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
                  >

                    <div className="mb-4 flex items-start justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                        {assessment.category === "Programming"
                          ? "🐍"
                          : assessment.category === "AI"
                          ? "🤖"
                          : "🌐"}
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          assessment.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {assessment.status}
                      </span>

                    </div>

                    <h3 className="text-lg font-bold">
                      {assessment.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {assessment.category}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2">

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Questions
                        </p>

                        <p className="mt-1 font-semibold">
                          {assessment.questions}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Minutes
                        </p>

                        <p className="mt-1 font-semibold">
                          {assessment.duration}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Students
                        </p>

                        <p className="mt-1 font-semibold">
                          {assessment.students}
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={() => navigate("/results")}
                      className="mt-5 w-full rounded-lg border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      View Results
                    </button>

                  </div>

                ))}

              </div>

            </section>

          </div>

        </main>

      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-lg backdrop-blur md:hidden">

        <div className="mx-auto flex max-w-md items-center justify-around">

          <button
            onClick={() => navigate("/instructor-dashboard")}
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
            onClick={goToAssessments}
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
            onClick={() => navigate("/results")}
            className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1 text-slate-500"
          >
            <span className="text-lg">
              📊
            </span>

            <span className="text-[10px] font-semibold">
              Results
            </span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1 text-slate-500"
          >
            <span className="text-lg">
              🕘
            </span>

            <span className="text-[10px] font-semibold">
              History
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

export default InstructorDashboard;