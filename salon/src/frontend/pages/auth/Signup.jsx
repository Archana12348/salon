"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Link } from "react-router-dom";

export default function SignupForm({ goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState(""); // 1. Gender state
  const [imagePreview, setImagePreview] = useState(null); // 2. Image preview

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 3. Limit to 2 MB
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Image size must not exceed 2 MB",
        });
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Image size must not exceed 2 MB",
        });
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.includes("@")) newErrors.email = "Enter a valid email";
    if (!gender) newErrors.gender = "Please select your gender"; // <-- gender validation
    if (phone && !/^\d{10}$/.test(phone))
      newErrors.phone = "Phone must be 10 digits"; // <-- changed
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      Swal.fire({
        icon: "error",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        html: `
      <div style="text-align: left; line-height: 1.5;">
        ${Object.values(newErrors)
          .map(
            (err) =>
              `<div style="background:#fff; padding:8px 12px; border-radius:6px; margin-top:4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${err}</div>`
          )
          .join("")}
      </div>
    `,
        customClass: {
          popup: "shadow-lg border border-gray-200 rounded-xl",
        },
      });

      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("country_code", countryCode);
    formData.append("password", password);
    if (image) formData.append("avatar", image);

    try {
      const res = await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Backend Response:", data); // Always log backend response
      debugger;

      if (!data.status) {
        // Backend returned validation errors
        if (data.errors) {
          setErrors(data.errors);

          Swal.fire({
            icon: "error",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            html: `
          <div style="text-align: left; line-height: 1.5;">
            ${Object.values(data.errors)
              .map(
                (err) =>
                  `<div style="background:#fff; padding:8px 12px; border-radius:6px; margin-top:4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${err}</div>`
              )
              .join("")}
          </div>
        `,
            customClass: {
              popup: "shadow-lg border border-gray-200 rounded-xl",
            },
          });
        } else {
          // Some other backend error
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: data.message || "Something went wrong",
          });
        }

        setLoading(false);
        return;
      }

      // SUCCESS CASE (status: true)
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: data.message || "You can now login to your account",
      });

      // If backend returns user data, you can use it here
      // Example: data.user, data.token, etc.
      console.log("Registered User Data:", data.data);

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
      setImage(null);
      setImagePreview(null);
      setErrors({});
    } catch (err) {
      // Print backend error if available
      if (err.response) {
        // If using axios, err.response exists
        console.log("Backend Error Response:", err.response.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: JSON.stringify(err.response.data),
        });
      } else {
        // Fetch network or other error
        console.log("Error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message || "Something went wrong!",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center mt-20 px-4 sm:px-6 md:px-0 mb-20">
      <div
        className="border-[#00CED1]-2 p-6 sm:p-12 pb-16 sm:pb-24 pt-8 sm:pt-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/2 rounded-2xl shadow-[0_25px_50px_rgba(0,206,209,0.4)] hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        <h2
          className="text-center mb-6"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          <span className="text-4xl sm:text-4xl font-bold bg-gradient-to-r from-[#00CED1] via-white-400 to-gray-800 text-transparent bg-clip-text">
            Welcome!
          </span>
          <br />
          <span className="text-2xl sm:text-2xl font-medium text-gray-800">
            Create Your Account
          </span>
        </h2>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="w-full">
            <label className="text-sm  font-semibold text-gray-700">
              Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`border rounded-lg px-3 py-2 w-full placeholder:text-gray-500 outline-none shadow-sm focus:shadow-md transition ${
                errors.name ? "border-red-500" : "border-[#00CED1]"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="text-sm  font-semibold text-gray-700">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border rounded-lg px-3 py-2 w-full placeholder:text-gray-500 outline-none shadow-sm focus:shadow-md transition ${
                errors.email ? "border-red-500" : "border-[#00CED1]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="w-full">
            <label className="text-sm  font-semibold text-gray-700">
              Phone
            </label>
            <div className="flex gap-2 w-full">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border rounded-lg px-2 py-2 outline-none border-[#00CED1] bg-white shadow-sm focus:shadow-md transition"
              >
                <option value="+91">🇮🇳 +91 (IN)</option>
                {/* <option value="+971">🇦🇪 +971 (🇦🇪)</option> */}
              </select>
              <input
                type="tel"
                placeholder="eg. 1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                className={`border rounded-lg px-3 py-2 w-full placeholder:text-gray-500 outline-none flex-1 shadow-sm focus:shadow-md transition ${
                  errors.phone ? "border-red-500" : "border-[#00CED1]"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div className="w-full">
            <label className="text-sm  font-semibold text-gray-700">
              Gender<span className="text-red-600">*</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full outline-none border-[#00CED1] shadow-sm focus:shadow-md transition"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Password */}
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border rounded-lg px-3 py-2 w-full placeholder:text-gray-500 outline-none shadow-sm focus:shadow-md transition ${
                  errors.password ? "border-red-500" : "border-[#00CED1]"
                }`}
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="w-full">
            <label className="text-sm  font-semibold text-gray-700">
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`border rounded-lg px-3 py-2 w-full placeholder:text-gray-500 outline-none shadow-sm focus:shadow-md transition ${
                  errors.confirmPassword ? "border-red-500" : "border-[#00CED1]"
                }`}
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="w-full">
            <label className="text-sm  font-semibold text-gray-700">
              Profile Image
            </label>
            <div
              className="border-2 border-dashed border-[#00CED1] rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer w-full shadow-sm hover:shadow-md transition"
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("imageInput").click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full object-contain rounded-lg"
                />
              ) : (
                <p className="text-gray-400">Drag & Drop or Click to Upload</p>
              )}
              <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </div>
          </div>

          {/* Signup button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#00CED1] to-black text-white scale-[1.03] font-semibold py-2 sm:py-3 rounded-3xl transition hover:opacity-90 hover:shadow-lg mt-2"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Login switch */}
          <p className="text-center text-base sm:text-md font-medium mt-4 text-black">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#00CED1] cursor-pointer font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
