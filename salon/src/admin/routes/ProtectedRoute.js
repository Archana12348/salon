import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or loader
  if (!isAuthenticated) {
    return <Navigate to="/admin/auth/login" replace />;
  }

  return <Outlet />;
}
