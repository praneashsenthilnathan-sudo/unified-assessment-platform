import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  const [largeText, setLargeText] = useState(
    localStorage.getItem("largeText") === "true"
  );

  const [reduceMotion, setReduceMotion] = useState(
    localStorage.getItem("reduceMotion") === "true"
  );

  const [highContrast, setHighContrast] = useState(
    localStorage.getItem("highContrast") === "true"
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* =========================
     ROLE BASED DASHBOARD
  ========================= */

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

  /* =========================
     APPLY SETTINGS
  ========================= */

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark");

    if (theme === "dark") {
      root.classList.add("dark");
    }

    if (theme === "default") {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (systemDark) {
        root.classList.add("dark");
      }
    }

    root.classList.toggle("large-text", largeText);
    root.classList.toggle("reduce-motion", reduceMotion);
    root.classList.toggle("high-contrast", highContrast);

    localStorage.setItem("theme", theme);
    localStorage.setItem("largeText", largeText);
    localStorage.setItem("reduceMotion", reduceMotion);
    localStorage.setItem("highContrast", highContrast);
  }, [theme, largeText, reduceMotion, highContrast]);

  /* =========================
     RESET
  ========================= */

  const resetSettings = () => {
    setTheme("default");
    setLargeText(false);
    setReduceMotion(false);
    setHighContrast(false);
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
              Settings
            </p>
          </div>

          <button
            onClick={() => navigate(getDashboardPath())}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            ← Dashboard
          </button>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-4xl px-4 py-6 pb-10 sm:px-6">

        {/* TITLE */}

        <div className="mb-8">

          <p className="text-sm font-medium text-indigo-600">
            Preferences
          </p>

          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            Settings
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Customize your Unified Assessment experience.
          </p>

        </div>

        {/* ================= APPEARANCE ================= */}

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">

            <h3 className="text-lg font-bold">
              Appearance
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Choose how the application looks.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* LIGHT */}

            <button
              onClick={() => setTheme("light")}
              className={`rounded-xl border p-4 text-left transition ${
                theme === "light"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >

              <div className="text-2xl">
                ☀️
              </div>

              <h4 className="mt-3 font-semibold">
                Light
              </h4>

              <p className="mt-1 text-xs text-slate-500">
                Use light appearance.
              </p>

            </button>

            {/* DARK */}

            <button
              onClick={() => setTheme("dark")}
              className={`rounded-xl border p-4 text-left transition ${
                theme === "dark"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >

              <div className="text-2xl">
                🌙
              </div>

              <h4 className="mt-3 font-semibold">
                Dark
              </h4>

              <p className="mt-1 text-xs text-slate-500">
                Use dark appearance.
              </p>

            </button>

            {/* DEFAULT */}

            <button
              onClick={() => setTheme("default")}
              className={`rounded-xl border p-4 text-left transition ${
                theme === "default"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >

              <div className="text-2xl">
                💻
              </div>

              <h4 className="mt-3 font-semibold">
                Default
              </h4>

              <p className="mt-1 text-xs text-slate-500">
                Follow system preference.
              </p>

            </button>

          </div>

        </section>

        {/* ================= ACCESSIBILITY ================= */}

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">

            <h3 className="text-lg font-bold">
              Accessibility
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Make the application easier to use.
            </p>

          </div>

          <div className="space-y-4">

            {/* LARGE TEXT */}

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">

              <div>

                <p className="font-semibold">
                  Larger Text
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Increase application text size.
                </p>

              </div>

              <input
                type="checkbox"
                checked={largeText}
                onChange={(e) => setLargeText(e.target.checked)}
                className="h-5 w-5"
              />

            </label>

            {/* REDUCE MOTION */}

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">

              <div>

                <p className="font-semibold">
                  Reduce Motion
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Reduce animations and transitions.
                </p>

              </div>

              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(e) =>
                  setReduceMotion(e.target.checked)
                }
                className="h-5 w-5"
              />

            </label>

            {/* HIGH CONTRAST */}

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">

              <div>

                <p className="font-semibold">
                  High Contrast
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Improve contrast for readability.
                </p>

              </div>

              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) =>
                  setHighContrast(e.target.checked)
                }
                className="h-5 w-5"
              />

            </label>

          </div>

        </section>

        {/* ================= ACCOUNT ================= */}

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <h3 className="text-lg font-bold">
            Account
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Manage your account information.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <button
              onClick={() => navigate("/profile")}
              className="rounded-lg border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              👤 Open Profile
            </button>

            <button
              onClick={logout}
              className="rounded-lg border border-red-300 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              🚪 Logout
            </button>

          </div>

        </section>

        {/* ================= RESET ================= */}

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h3 className="font-bold">
                Reset Preferences
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Restore appearance and accessibility settings.
              </p>

            </div>

            <button
              onClick={resetSettings}
              className="rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-50"
            >
              Reset Settings
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;