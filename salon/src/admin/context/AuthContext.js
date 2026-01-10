// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);

//   // Check if user is already authenticated
//   useEffect(() => {
//     const checkAuth = () => {
//       const authStatus = localStorage.getItem("isAuthenticated");
//       const userData = localStorage.getItem("userData");
//       const savedRoles = localStorage.getItem("roles");
//       const savedPermissions = localStorage.getItem("permissions");

//       if (authStatus === "true" && userData) {
//         setIsAuthenticated(true);
//         setUser(JSON.parse(userData));
//         setRoles(savedRoles ? JSON.parse(savedRoles) : []);
//         setPermissions(savedPermissions ? JSON.parse(savedPermissions) : []);
//       }
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response23 = await fetch(
//         "https://jumeirah.premierwebtechservices.com/backend/sanctum/csrf-cookie",
//         {
//           credentials: "include",
//         }
//       );

//       console.log("response", response23);
//       debugger;
//       const response = await fetch("https://jumeirah.premierwebtechservices.com/backend/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // ✅ REQUIRED for cookies
//         body: JSON.stringify({
//           email,
//           password,
//           user_type: "admin",
//           login_type: "email",
//         }),
//       });

//       const data = await response.json();
//       console.log(data);
//       debugger;

//       if (response.ok && data.status) {
//         const userData = {
//           name: data.data.name,
//           email: data.data.email,
//         };

//         setUser(userData);
//         setIsAuthenticated(true);

//         // ✅ Optional UI state only
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("userData", JSON.stringify(userData));

//         // ❌ NO TOKEN STORAGE
//         return { success: true };
//       } else {
//         setError(data.message || "Login failed");
//         return { success: false, error: data.message };
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       return { success: false, error: "Something went wrong" };
//     }
//   };

//   const signup = async (formData) => {
//     try {
//       const response = await fetch("https://jumeirah.premierwebtechservices.com/backend/api/admin/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         return { success: true, message: "Account created successfully." };
//       } else {
//         setError(result.message || "Registration failed.");
//         return { success: false, error: result.message };
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       return { success: false, error: "Something went wrong" };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     setRoles([]);
//     setPermissions([]);
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("userData");
//     localStorage.clear();
//   };

//   const value = {
//     user,
//     isAuthenticated,
//     loading,
//     error,
//     roles,
//     permissions,
//     login,
//     signup,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * ✅ CHECK AUTH ONLY ONCE (SOURCE OF TRUTH = BACKEND)
   */
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking auth...");
      try {
        const res = await fetch(
          "https://jumeirah.premierwebtechservices.com/backend/api/auth/check",
          {
            method: "GET",
            credentials: "include", // 🔑 REQUIRED FOR cookies
          }
        );

        const data = await res.json(); // parse JSON first
        console.log(data);

        // Instead of throwing, check your API response
        if (data.status === true || data.authenticated === true) {
          setUser(data.user || null); // adjust to your API
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        // Network or unexpected error
        console.error("Error checking auth:", err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * ✅ LOGIN (COOKIE BASED — NO TOKEN STORAGE)
   */
  const login = async (email, password) => {
    try {
      setError("");

      // 1️⃣ Get CSRF cookie (Sanctum requirement)
      await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/sanctum/csrf-cookie",
        {
          credentials: "include",
        }
      );

      // 2️⃣ Login request
      const res = await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
            user_type: "admin",
            login_type: "email",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Login failed");
      }

      // 3️⃣ Set state
      setUser({
        name: data.data.name,
        email: data.data.email,
      });
      setIsAuthenticated(true);

      // ✅ OPTIONAL (UI cache only)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: data.data.name,
          email: data.data.email,
        })
      );

      return { success: true };
    } catch (err) {
      setError(err.message || "Something went wrong");
      return { success: false, error: err.message };
    }
  };

  /**
   * ✅ LOGOUT
   */
  const logout = async () => {
    try {
      await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (_) {
      // ignore
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
