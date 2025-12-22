// import React from "react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const sectionStyle = {
//     backgroundImage:
//       'url("/hero/hero_shape_1_4.svg"), url("/shape/vector_shape_12.png"), url("/hero/hero_arrow.svg")',
//     backgroundPosition: "top left, center, top right",
//     backgroundSize: "auto 100%, auto, auto 10%",
//     backgroundRepeat: "no-repeat",
//   };

//   return (
//     <section
//       className="min-h-screen flex items-center justify-center px-4 bg-green-100 relative overflow-hidden"
//       style={sectionStyle}
//     >
//       <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 relative z-10">
//         <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
//           Login
//         </h2>

//         <form className="space-y-5">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             />
//           </div>

//           {/* Forgot password link */}
//           <div className="text-right -mt-3">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-green-600 hover:text-[#FF9C00] font-semibold hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-[#FF9C00] transition-all">
//             Login
//           </button>
//         </form>

//         {/* ---------- OR Divider ---------- */}
//         <div className="flex items-center my-6">
//           <div className="flex-grow h-px bg-gray-300"></div>
//           <span className="px-3 text-gray-500 text-sm">OR</span>
//           <div className="flex-grow h-px bg-gray-300"></div>
//         </div>

//         {/* ---------- Social Login Buttons ---------- */}
//         {/* ---------- Social Login Icons Row ---------- */}
//         <div className="flex items-center justify-center gap-5 mt-6">
//           {/* Facebook */}
//           <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-blue-600 transition-all">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
//               alt="Facebook"
//               className="w-6 h-6"
//             />
//           </button>

//           {/* Google */}
//           <button className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-all">
//             <img
//               src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//               alt="Google"
//               className="w-6 h-6"
//             />
//           </button>
//         </div>

//         <p className="text-center text-sm mt-4">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-green-600 hover:text-[#FF9C00] font-semibold hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sectionStyle = {
    backgroundImage:
      'url("/hero/hero_shape_1_4.svg"), url("/shape/vector_shape_12.png"), url("/hero/hero_arrow.svg")',
    backgroundPosition: "top left, center, top right",
    backgroundSize: "auto 100%, auto, auto 10%",
    backgroundRepeat: "no-repeat",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://pos.premierwebtechservices.com/api/login",
        {
          username: email,
          user_type: "user",
          password: password,
          login_type: "email",
        }
      );

      console.log("LOGIN SUCCESS RESPONSE:", res.data);

      if (res.data?.success === true) {
        // 🔐 TOKEN & USER SAVE
        localStorage.setItem("authToken", res.data.result?.token);
        localStorage.setItem("userData", JSON.stringify(res.data.result));

        toast.success("Login Successful!");

        setTimeout(() => {
          navigate("/"); // home / dashboard
        }, 1500);
      } else {
        toast.error(res.data?.message || "Login failed!");
      }
    } catch (err) {
      console.log("LOGIN ERROR RESPONSE:", err.response?.data);
      toast.error(
        err.response?.data?.message || "Invalid credentials or API error"
      );
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 bg-green-100 relative overflow-hidden"
      style={sectionStyle}
    >
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="text-right -mt-3">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:text-[#FF9C00] font-semibold"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-[#FF9C00]">
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-5">
          <button className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
              className="w-6 h-6"
            />
          </button>

          <button className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-6 h-6"
            />
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>

      <ToastContainer />
    </section>
  );
}
