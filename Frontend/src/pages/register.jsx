import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    institute_code: "UAP2026",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo account details
  const demoAccounts = {
    Student: {
      name: "",
      email: "",
      password: "",
    },

    Instructor: {
      name: "Kamaleni",
      email: "kamaleni02@gmail.com",
      password: "123456",
    },

    Admin: {
      name: "Santhoshi",
      email: "santhoshi222@gmail.com",
      password: "22102010",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    const demo = demoAccounts[selectedRole];

    setFormData((current) => ({
      ...current,
      role: selectedRole,
      name: demo.name,
      email: demo.email,
      password: demo.password,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role ||
      !formData.institute_code
    ) {
      setError("Please fill all the required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          institute_code: formData.institute_code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      setSuccess(
        `${formData.role} account created successfully! Redirecting to login...`
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message ||
          "Unable to connect to the backend. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">
          {/* Left Section */}
          <div className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">
                  📚
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    Unified Assessment Platform
                  </h1>

                  <p className="text-sm text-blue-100">
                    Smart Assessment System
                  </p>
                </div>
              </div>

              <h2 className="text-4xl font-bold leading-tight">
                Create your
                <br />
                assessment account.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-blue-100">
                Join the platform and access assessments, results, performance
                tracking and role-based features.
              </p>
            </div>

            <div className="space-y-3 text-sm text-blue-100">
              <p>✓ Student assessments</p>
              <p>✓ Instructor assessment management</p>
              <p>✓ Admin platform management</p>
              <p>✓ Secure role-based access</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                📚
              </div>

              <div>
                <h1 className="font-bold text-slate-900 dark:text-white">
                  Unified Assessment Platform
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Smart Assessment System
                </p>
              </div>
            </div>

            <div className="mb-7">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Create Account
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Register as a Student, Instructor or Admin.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Account Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Institute Code */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Institute Code
                </label>

                <input
                  type="text"
                  name="institute_code"
                  value={formData.institute_code}
                  onChange={handleChange}
                  placeholder="Enter institute code"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Demo Account Info */}
              {formData.role !== "Student" && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                    {formData.role} Demo Account
                  </p>

                  <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                    Credentials are pre-filled for project testing.
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;