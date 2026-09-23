import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const assessments = [
  {
    id: 1,
    title: "Python Programming Assessment",
    category: "Programming",
    questions: 5,
    duration: 30,
    difficulty: "Intermediate",
  },
  {
    id: 2,
    title: "Artificial Intelligence Basics",
    category: "AI",
    questions: 5,
    duration: 40,
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Web Development Assessment",
    category: "Web Development",
    questions: 5,
    duration: 45,
    difficulty: "Intermediate",
  },
];

function StudentDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(search.toLowerCase()) ||
      assessment.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || assessment.category === filter;

    return matchesSearch && matchesFilter;
  });

  const startAssessment = (assessment) => {
    navigate("/assessment", {
      state: {
        assessment,
      },
    });
  };

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

          {/* Logo */}
          <div>
            <h1 className="text-lg font-bold text-indigo-600 sm:text-xl">
              Unified Assessment
            </h1>

            <p className="text-[10px] text-slate-500 sm:text-xs">
              Student Portal
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            {/* Notification */}
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
                {(user.name || "S").charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold">
                  {user.name || "Student"}
                </p>

                <p className="text-xs text-slate-500">
                  Student
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
                onClick={() => navigate("/student-dashboard")}
                className="flex w-full items-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 text-left font-semibold text-indigo-600"
              >
                🏠
                <span>Dashboard</span>
              </button>

              <button
                onClick={goToAssessments}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                📝
                <span>Assessments</span>
              </button>

              <button
                onClick={() => navigate("/results")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                📊
                <span>Results</span>
              </button>

              <button
                onClick={() => navigate("/history")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                🕘
                <span>History</span>
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                👤
                <span>Profile</span>
              </button>

              <button
                onClick={() => navigate("/notifications")}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition hover:bg-slate-100"
              >
                🔔
                <span>Notifications</span>
              </button>

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

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 md:pb-6">

          <div className="mx-auto max-w-7xl">

            {/* Welcome */}
            <section className="mb-7">

              <p className="mb-2 text-sm font-medium text-indigo-600">
                Student Dashboard
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Welcome back, {user.name || "Student"} 👋
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Continue your assessments and track your learning progress.
              </p>

            </section>

            {/* ================= STATS ================= */}
            <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Available
                </p>

                <h3 className="mt-2 text-2xl font-bold text-indigo-600 sm:text-3xl">
                  3
                </h3>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Completed
                </p>

                <h3 className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
                  0
                </h3>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Avg. Score
                </p>

                <h3 className="mt-2 text-2xl font-bold text-purple-600 sm:text-3xl">
                  0%
                </h3>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">
                  Status
                </p>

                <h3 className="mt-2 text-sm font-bold text-orange-500 sm:text-lg">
                  Keep Learning 🚀
                </h3>
              </div>

            </section>

            {/* ================= ASSESSMENTS ================= */}
            <section id="assessments">

              <div className="mb-5">

                <div className="mb-4">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Available Assessments
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose an assessment and test your knowledge.
                  </p>
                </div>

                {/* Search + Filter */}
                <div className="flex flex-col gap-3 sm:flex-row">

                  <input
                    type="text"
                    placeholder="🔍 Search assessments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:flex-1"
                  />

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 sm:w-52"
                  >
                    <option value="All">All Categories</option>
                    <option value="Programming">Programming</option>
                    <option value="AI">AI</option>
                    <option value="Web Development">
                      Web Development
                    </option>
                  </select>

                </div>

              </div>

              {/* Assessment Cards */}
              {filteredAssessments.length === 0 ? (

                <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                  <div className="text-4xl">🔍</div>

                  <h3 className="mt-3 font-semibold">
                    No assessments found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filter.
                  </p>
                </div>

              ) : (

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                  {filteredAssessments.map((assessment) => (

                    <div
                      key={assessment.id}
                      className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
                    >

                      <div className="mb-4 flex items-start justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                          {assessment.category === "Programming"
                            ? "🐍"
                            : assessment.category === "AI"
                            ? "🤖"
                            : "🌐"}
                        </div>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600 sm:px-3 sm:text-xs">
                          {assessment.difficulty}
                        </span>

                      </div>

                      <h3 className="text-lg font-bold">
                        {assessment.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        {assessment.category}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3">

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
                            Duration
                          </p>

                          <p className="mt-1 font-semibold">
                            {assessment.duration} min
                          </p>
                        </div>

                      </div>

                      <button
                        onClick={() => startAssessment(assessment)}
                        className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                      >
                        Start Assessment →
                      </button>

                    </div>

                  ))}

                </div>

              )}

            </section>

            {/* ================= QUICK ACCESS ================= */}
            <section className="mt-10">

              <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                Quick Access
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

                <button
                  onClick={() => navigate("/results")}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">📊</div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    My Results
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    View your assessment performance.
                  </p>
                </button>

                <button
                  onClick={() => navigate("/history")}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">🕘</div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    History
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    View completed assessments.
                  </p>
                </button>

                <button
                  onClick={() => navigate("/notifications")}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">🔔</div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    Notifications
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    Check your latest updates.
                  </p>
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md sm:p-5"
                >
                  <div className="text-2xl">⚙️</div>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">
                    Settings
                  </h3>

                  <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                    Manage your preferences.
                  </p>
                </button>

              </div>

            </section>

          </div>

        </main>

      </div>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-lg backdrop-blur md:hidden">

        <div className="mx-auto flex max-w-md items-center justify-around">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/student-dashboard")}
            className="flex min-w-[60px] flex-col items-center gap-1 rounded-lg px-2 py-1 text-indigo-600"
          >
            <span className="text-lg">🏠</span>
            <span className="text-[10px] font-semibold">
              Home
            </span>
          </button>

          {/* Assessments */}
          <button
            onClick={goToAssessments}
            className="flex min-w-[60px] flex-col items-center gap-1 rounded-lg px-2 py-1 text-slate-500"
          >
            <span className="text-lg">📝</span>
            <span className="text-[10px] font-semibold">
              Tests
            </span>
          </button>

          {/* Results */}
          <button
            onClick={() => navigate("/results")}
            className="flex min-w-[60px] flex-col items-center gap-1 rounded-lg px-2 py-1 text-slate-500"
          >
            <span className="text-lg">📊</span>
            <span className="text-[10px] font-semibold">
              Results
            </span>
          </button>

          {/* History */}
          <button
            onClick={() => navigate("/history")}
            className="flex min-w-[60px] flex-col items-center gap-1 rounded-lg px-2 py-1 text-slate-500"
          >
            <span className="text-lg">🕘</span>
            <span className="text-[10px] font-semibold">
              History
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex min-w-[60px] flex-col items-center gap-1 rounded-lg px-2 py-1 text-slate-500"
          >
            <span className="text-lg">👤</span>
            <span className="text-[10px] font-semibold">
              Profile
            </span>
          </button>

        </div>
      </nav>

    </div>
  );
}

export default StudentDashboard;