"use client";

import { createContext, useContext, useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "https://jumeirah.premierwebtechservices.com/backend/api";

  // Helper: get token from localStorage
  const getToken = () => localStorage.getItem("auth_salon_token");

  // Fetch user info using token
  const fetchUser = async (token = null) => {
    const t = token || getToken();
    if (!t) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/check`, {
        headers: {
          Authorization: `Bearer ${t}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Unauthenticated");

      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("auth_salon_token");
    } finally {
      setLoading(false);
    }
  };

  // On mount, check if token exists
  useEffect(() => {
    const token = getToken();
    if (token) fetchUser(token);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ❌ API error
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ❌ Block unauthorized users
      if (!["admin", "staff"].includes(data.user.user_type)) {
        throw new Error("You are not allowed to access this panel");
      }

      // ✅ Save token
      localStorage.setItem("auth_salon_token", data.token);

      // ✅ Fetch logged-in user
      await fetchUser(data.token);

      return { success: true };
    } catch (err) {
      setError(err.message || "Something went wrong");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_salon_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
