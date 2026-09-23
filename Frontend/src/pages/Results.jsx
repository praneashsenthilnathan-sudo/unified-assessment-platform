import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
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
        console.error("Assessment history error:", error);
        setHistory([]);
      }
    }
  }, []);

  // Role-based dashboard navigation
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

  const completedCount = history.length;

  const averageScore =
    history.length > 0
      ? Math.round(
          history.reduce(
            (total, item) => total + Number(item.percentage || 0),
            0
          ) / history.length
        )
      : 0;

  const latestResult = history.length > 0 ? history[0] : null;

  const roleName =
    user.role?.charAt(0)?.toUpperCase() +
      user.role?.slice(1)?.toLowerCase() || "Student";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Results
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              View your assessment performance
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
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user.name ? `${user.name}'s Results` : "Assessment Results"}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Role: {roleName}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Completed */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl dark:bg-blue-900/40">
                📝
              </div>

              <span className="text-xs font-semibold text-slate-400">
                TOTAL
              </span>
            </div>

            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {completedCount}
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Completed Assessments
            </p>
          </div>

          {/* Average */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl dark:bg-green-900/40">
                📈
              </div>

              <span className="text-xs font-semibold text-slate-400">
                AVERAGE
              </span>
            </div>

            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {averageScore}%
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Average Performance
            </p>
          </div>

          {/* Latest */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl dark:bg-purple-900/40">
                🏆
              </div>

              <span className="text-xs font-semibold text-slate-400">
                LATEST
              </span>
            </div>

            <p className="truncate text-xl font-bold text-slate-900 dark:text-white">
              {latestResult ? `${latestResult.percentage}%` : "No Result"}
            </p>

            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
              {latestResult?.title || "No assessment completed yet"}
            </p>
          </div>
        </div>

        {/* Latest Result */}
        {latestResult && (
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/20">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Latest Assessment
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {latestResult.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {latestResult.category || "Assessment"} •{" "}
                  {latestResult.date || "Recently completed"}
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {latestResult.percentage}%
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Score: {latestResult.score}/{latestResult.total}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Results */}
        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Assessment Results
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your completed assessment performance
              </p>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="text-4xl">📊</div>

              <h4 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                No results yet
              </h4>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Complete an assessment to see your score and performance here.
              </p>

              <button
                onClick={() => navigate(getDashboardPath())}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((result, index) => {
                const percentage = Number(result.percentage || 0);

                return (
                  <div
                    key={result.id || index}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      {/* Assessment Info */}
                      <div className="min-w-0">
                        <h4 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                          {result.title}
                        </h4>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {result.category || "Assessment"}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {result.date || "Date unavailable"}
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex items-center gap-5">
                        <div className="min-w-28">
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400">
                              Performance
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

                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            {result.score}/{result.total}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Score
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Dashboard Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(getDashboardPath())}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            ← Back to {roleName} Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default Results;