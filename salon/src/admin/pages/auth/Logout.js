import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch(
          "https://jumeirah.premierwebtechservices.com/backend/api/logout",
          {
            method: "POST",
            credentials: "include", // 🔑 IMPORTANT
          }
        );
      } catch (e) {
        console.error("Logout error", e);
      } finally {
        // Clear frontend state only
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userData");
        localStorage.removeItem("roles");
        localStorage.removeItem("permissions");

        navigate("/login", { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return null; // no UI needed
}
