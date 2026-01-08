"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const [otpStep, setOtpStep] = useState(false); // OTP step
  const [resetStep, setResetStep] = useState(false); // Reset password step

  // ---------------- SEND OTP ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!email.includes("@")) newErrors.email = "Enter a valid email";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        html: Object.values(newErrors)
          .map((err) => `<p>${err}</p>`)
          .join(""),
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!data.status) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong",
        });
        setLoading(false);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: "Check your email and enter the OTP below.",
      });

      setOtpStep(true);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }

    setLoading(false);
  };

  // ---------------- VERIFY OTP ----------------
  const handleOtpVerify = async () => {
    if (!otp || otp.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    setLoadingOtp(true);

    try {
      const res = await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!data.status) {
        Swal.fire({
          icon: "error",
          title: "OTP Incorrect",
          text: data.message || "Try again",
        });
        setLoadingOtp(false);
        return;
      }

      // Swal.fire({
      //   icon: "success",
      //   title: "Verified!",
      //   text: "Set your new password.",
      // });

      setOtpStep(false); // hide OTP
      setResetStep(true); // show password fields
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong verifying OTP",
      });
    }

    setLoadingOtp(false);
  };

  // ---------------- RESET PASSWORD ----------------
  const handlePasswordReset = async () => {
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    setLoadingReset(true);

    try {
      const res = await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp,
            password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const data = await res.json();
      console.log("data", data);
      debugger;

      if (!data.status) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Could not reset password",
        });
        setLoadingReset(false);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "You can now login with your new password.",
      });
      setConfirmPassword("");
      setEmail("");
      setOtp("");
      setPassword("");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong !",
      });
    }

    setLoadingReset(false);
  };

  return (
    <div className="w-full flex flex-col items-center mt-24 px-4 sm:px-6 md:px-0 mb-20">
      <div
        className="border-[#00CED1]-2 p-6 sm:p-12 pb-16 sm:pb-24 pt-8 sm:pt-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-2xl shadow-[0_25px_50px_rgba(0,206,209,0.4)] hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        <h2
          className="text-center mb-6"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#00CED1] via-white-400 to-gray-800 text-transparent bg-clip-text">
            Forgot Password?
          </span>
          <br />
          <span className="text-xl sm:text-xl font-medium text-gray-800">
            Enter your email to reset
          </span>
        </h2>

        {/* EMAIL STEP */}
        {!otpStep && !resetStep && (
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="text-sm  font-semibold text-gray-700">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border rounded-lg px-3 py-2 w-full ${
                  errors.email ? "border-red-500" : "border-[#00CED1]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00CED1] to-black text-white py-2 sm:py-3 rounded-3xl mt-2"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {/* OTP STEP */}
        {otpStep && (
          <div className="flex flex-col gap-4 mt-6">
            <label className="text-sm  font-semibold text-gray-700">
              Enter OTP<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full border-[#00CED1]"
            />

            <button
              onClick={handleOtpVerify}
              disabled={loadingOtp}
              className="w-full bg-gradient-to-r from-black to-[#00CED1] text-white py-2 sm:py-3 rounded-3xl"
            >
              {loadingOtp ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* RESET PASSWORD STEP */}
        {resetStep && (
          <div className="flex flex-col gap-4 mt-6">
            {/* New Password */}
            <label className="text-sm  font-semibold text-gray-700">
              New Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full border-[#00CED1]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Confirm Password */}
            <label className="text-sm  font-semibold text-gray-700">
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full border-[#00CED1]"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              onClick={handlePasswordReset}
              disabled={loadingReset}
              className="w-full bg-gradient-to-r from-[#00CED1] to-black text-white py-2 sm:py-3 rounded-3xl"
            >
              {loadingReset ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}

        {/* Back to login */}
        <p className="text-center text-black text-md mt-6">
          Remembered your password?{" "}
          <span
            onClick={""}
            className="text-[#00CED1] cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
