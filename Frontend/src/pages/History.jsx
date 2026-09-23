import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("User data error:", error);
      }
    }

    const storedHistory = localStorage.getItem("assessmentHistory");

    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error("History data error:", error);
        setHistory([]);
      }
    }
  }, []);

  // Role-based dashboard
  const getDashboardPath = () => {
    const role = user.role?.toLowerCase();

    if (role === "admin") {
      return "/admin-dashboard";
    }

    if (role === "instructor") {
      return "/instructor-dashboard";
    }

    return "/student-dashboard";
  };

  const roleName =
    user.role?.charAt(0)?.toUpperCase() +
      user.role?.slice(1)?.toLowerCase() || "Student";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Assessment History
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              View your previous assessment attempts
            </p>
          </div>

          <button
            onClick={() => navigate(getDashboardPath())}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* User Info */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user.name || "User"}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {user.email || "No email available"}
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {roleName}
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl dark:bg-blue-900/40">
                📚
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {history.length}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Attempts
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl dark:bg-green-900/40">
                📈
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {history.length > 0
                    ? Math.round(
                        history.reduce(
                          (sum, item) =>
                            sum + Number(item.percentage || 0),
                          0
                        ) / history.length
                      )
                    : 0}
                  %
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Average Score
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl dark:bg-purple-900/40">
                🏆
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {history.length > 0
                    ? Math.max(
                        ...history.map((item) =>
                          Number(item.percentage || 0)
                        )
                      )
                    : 0}
                  %
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Highest Score
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <section>
          <div className="mb-5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Previous Assessments
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your assessment attempts are listed below.
            </p>
          </div>

          {history.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="text-5xl">🗂️</div>

              <h4 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                No assessment history
              </h4>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Once you complete an assessment, your attempt and score will
                appear here.
              </p>

              <button
                onClick={() => navigate(getDashboardPath())}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => {
                const percentage = Number(item.percentage || 0);

                let status = "Completed";

                if (percentage >= 80) {
                  status = "Excellent";
                } else if (percentage >= 60) {
                  status = "Good";
                } else if (percentage >= 40) {
                  status = "Average";
                } else {
                  status = "Needs Improvement";
                }

                return (
                  <div
                    key={item.id || index}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      {/* Left */}
                      <div className="min-w-0">
                        <h4 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                          {item.title || "Assessment"}
                        </h4>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {item.category || "General"}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {item.date || "Date unavailable"}
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="w-full sm:w-40">
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400">
                              Score
                            </span>

                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              {percentage}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                              className="h-full rounded-full bg-blue-600 transition-all"
                              style={{
                                width: `${Math.min(
                                  Math.max(percentage, 0),
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="min-w-24 text-center">
                          <p className="text-xl font-bold text-slate-900 dark:text-white">
                            {item.score}/{item.total}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Marks
                          </p>
                        </div>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-center text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                          {status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={() => navigate("/results")}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View Results
          </button>

          <button
            onClick={() => navigate(getDashboardPath())}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to {roleName} Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default History;