import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const sectionStyle = {
    backgroundImage:
      'url("/hero/hero_shape_1_4.svg"), url("/shape/vector_shape_12.png"), url("/hero/hero_arrow.svg")',
    backgroundPosition: "top left, center, top right",
    backgroundSize: "auto 100%, auto, auto 10%",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-green-100 relative overflow-hidden"
      style={sectionStyle}
    >
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Create Your Account
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Mobile */}
          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Address (full width) */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              placeholder="Enter full address"
              className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500"
              rows={3}
              required
            ></textarea>
          </div>

          {/* GST Number (Optional) */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              GST Number (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter GST number (if any)"
              className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button (full width) */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
