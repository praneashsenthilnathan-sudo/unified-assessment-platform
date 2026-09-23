import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Assessment Available",
      message: "A new assessment is available for you.",
      time: "10 minutes ago",
      type: "assessment",
      read: false,
    },
    {
      id: 2,
      title: "Assessment Completed",
      message: "Your assessment result is now available.",
      time: "2 hours ago",
      type: "result",
      read: false,
    },
    {
      id: 3,
      title: "Profile Updated",
      message: "Your profile information was updated successfully.",
      time: "Yesterday",
      type: "system",
      read: true,
    },
  ]);

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

  const roleName =
    user.role?.charAt(0)?.toUpperCase() +
      user.role?.slice(1)?.toLowerCase() || "Student";

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const getIcon = (type) => {
    if (type === "assessment") {
      return "📝";
    }

    if (type === "result") {
      return "📊";
    }

    return "🔔";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Notifications
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Stay updated with your platform activity
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
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* User / Summary */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Hello, {user.name || "User"} 👋
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Role: {roleName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {unreadCount} Unread
              </span>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="text-5xl">🔔</div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                No notifications
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                You're all caught up.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl border p-5 shadow-sm transition ${
                  notification.read
                    ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                    : "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/20"
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${
                      notification.read
                        ? "bg-slate-100 dark:bg-slate-800"
                        : "bg-blue-100 dark:bg-blue-900/40"
                    }`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white">
                            {notification.title}
                          </h3>

                          {!notification.read && (
                            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                              NEW
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {notification.message}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-slate-400">
                        {notification.time}
                      </span>
                    </div>

                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={() => navigate("/settings")}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            ⚙️ Settings
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

export default Notifications;