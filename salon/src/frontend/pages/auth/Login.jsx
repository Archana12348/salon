"use client";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUserAuth } from "../../context/UserAuthContext";

export default function LoginForm({ goSignup, goForgetPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Enter a valid email",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    try {
      const response = await login(email, password);

      console.log("Login successful:", response);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Login Successful",
      });

      // ✅ ALWAYS go to appointment after login
      // navigate("/appointment", {
      //   replace: true,
      //   state: { from: location.state?.from },
      // });
      // login success ke baad
      const from = location.state?.from;

      if (from === location.state?.from) {
        navigate("/appointment", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-20 px-4 sm:px-6 md:px-0">
      <div
        className="border-[#00CED1]-2 p-6 sm:p-12 pb-16 sm:pb-24 pt-8 sm:pt-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-2xl shadow-[0_25px_50px_rgba(0,206,209,0.4)] hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        <h2 className="text-center mb-6">
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#00CED1] via-white-400 to-gray-800 text-transparent bg-clip-text">
            Welcome Back!
          </span>
          <br />
          <span className="text-2xl font-medium text-gray-800">
            Login to Continue
          </span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-md mx-auto"
        >
          {/* Email */}
          <label className="text-sm font-semibold text-gray-700">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-xl placeholder:text-gray-500 px-3 py-2 w-full border-[#00CED1] outline-none"
          />

          {/* Password */}
          <label className="text-sm font-semibold text-gray-700">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-xl px-3 py-2 w-full placeholder:text-gray-500 border-[#00CED1] outline-none"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Forgot Password */}
          <p className="text-sm text-right text-[#00CED1] mt-[6px]">
            <Link
              to="/forget-password"
              className="font-semibold hover:underline"
            >
              Forgot Password
            </Link>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#00CED1] to-black text-white scale-[1.03] font-semibold py-2 sm:py-3 rounded-xl transition hover:opacity-90 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup */}
          <p className="text-center text-base font-medium mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#00CED1] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
