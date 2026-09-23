import { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMessage(data.message);
      localStorage.setItem("recoveryEmail", email.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              UA
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mt-5">
              Forgot Password?
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              Enter your registered email to recover your password.
            </p>
          </div>

          {message && (
            <div className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? "Processing..." : "Continue"}
            </button>

          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              ← Back to Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;