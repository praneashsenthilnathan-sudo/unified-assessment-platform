import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      /*
        Save authentication data
      */

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      /*
        Role based dashboard
      */

      const role = data.user?.role?.toLowerCase();

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (err) {
      setError(
        err.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* =====================================================
          LEFT BRANDING SECTION
      ====================================================== */}

      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 xl:p-16 flex-col justify-between">

        <div>

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
              UA
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Unified Assessment
              </h1>

              <p className="text-blue-100 text-sm">
                Platform
              </p>
            </div>

          </div>


          {/* Main Heading */}

          <div className="mt-24 max-w-xl">

            <p className="text-blue-100 font-medium mb-4">
              SMART • SIMPLE • SECURE
            </p>

            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              One Platform.
              <br />
              Complete Assessment.
            </h2>

            <p className="mt-6 text-blue-100 text-lg leading-relaxed">
              Conduct mock tests, coding assessments,
              MCQs and written assessments in one
              unified platform.
            </p>

          </div>


          {/* Features */}

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                ✓
              </div>

              <div>
                <h3 className="font-semibold">
                  Multiple Assessment Types
                </h3>

                <p className="text-sm text-blue-100">
                  MCQ, coding and written assessments
                </p>
              </div>

            </div>


            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                ✓
              </div>

              <div>
                <h3 className="font-semibold">
                  Performance Tracking
                </h3>

                <p className="text-sm text-blue-100">
                  Track scores and assessment history
                </p>
              </div>

            </div>


            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                ✓
              </div>

              <div>
                <h3 className="font-semibold">
                  Role Based Access
                </h3>

                <p className="text-sm text-blue-100">
                  Student, Instructor and Admin
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Footer */}

        <p className="text-blue-100 text-sm">
          © 2026 Unified Assessment Platform
        </p>

      </div>


      {/* =====================================================
          RIGHT LOGIN SECTION
      ====================================================== */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}

          <div className="lg:hidden text-center mb-8">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
              UA
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mt-4">
              Unified Assessment
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Platform
            </p>

          </div>


          {/* Login Card */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-7 sm:p-9">

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-slate-900">
                Welcome Back 👋
              </h2>

              <p className="text-slate-500 mt-2">
                Sign in to continue to your account.
              </p>

            </div>


            {/* Error Message */}

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}


            {/* Login Form */}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* Password */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot Password?
                  </Link>

                </div>


                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />


                  {/* Show / Hide Password */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>

            </form>


            {/* Register */}

            <div className="mt-7 text-center">

              <p className="text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create Account
                </Link>

              </p>

            </div>

          </div>


          {/* Mobile Footer */}

          <p className="text-center text-xs text-slate-400 mt-6">
            © 2026 Unified Assessment Platform
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;