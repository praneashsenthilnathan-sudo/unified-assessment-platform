import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    institute_code: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("User data error:", error);
      }
    }
  }, []);

  // Role based dashboard
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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));

    setMessage("Profile updated successfully ✅");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const roleName =
    user.role?.charAt(0).toUpperCase() +
      user.role?.slice(1).toLowerCase() || "Student";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              My Profile
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your account information
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
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Profile Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          {/* Avatar */}
          <div className="-mt-12 px-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-lg dark:border-slate-900 dark:bg-blue-900/40 dark:text-blue-300">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {user.name || "User"}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {roleName}
                  </p>
                </div>
              </div>

              <div className="pb-1">
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  {roleName}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {message && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
                {message}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Account Information
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update your profile details below.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Email cannot be changed.
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Role
                </label>

                <input
                  type="text"
                  value={roleName}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                />
              </div>

              {/* Institute Code */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Institute Code
                </label>

                <input
                  type="text"
                  name="institute_code"
                  value={user.institute_code || ""}
                  onChange={handleChange}
                  placeholder="Enter institute code"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSave}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>

              <button
                onClick={() => navigate(getDashboardPath())}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100 sm:ml-auto dark:border-red-900 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
          <h3 className="font-bold text-blue-900 dark:text-blue-300">
            Account Role
          </h3>

          <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
            You are logged in as{" "}
            <span className="font-bold">{roleName}</span>. Dashboard navigation
            will automatically return to your role-specific dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Profile;