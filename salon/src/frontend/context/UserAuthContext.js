import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

const API_BASE = "https://jumeirah.premierwebtechservices.com/backend/api";

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Load auth from storage on refresh */
  useEffect(() => {
    const storedAuth = localStorage.getItem("user_auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setUser(parsed.user);
      setToken(parsed.token);
    }
    setLoading(false);
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const authData = {
        user: data.user,
        token: data.token,
      };

      localStorage.setItem("user_auth", JSON.stringify(authData));

      setUser(data.user);
      setToken(data.token);

      return data; // ✅ RETURN SUCCESS DATA
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- REGISTER ---------------- */
  const register = async (formData) => {
    setLoading(true);

    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      throw new Error(data.message || "Registration failed");
    }

    const authData = {
      user: data.user,
      token: data.token,
    };

    localStorage.setItem("user_auth", JSON.stringify(authData));
    setUser(data.user);
    setToken(data.token);
    setLoading(false);
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error("Logout API failed", e);
    }

    localStorage.removeItem("user_auth");
    setUser(null);
    setToken(null);
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        token,
        isUser: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
