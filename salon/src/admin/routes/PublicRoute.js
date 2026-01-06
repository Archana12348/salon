// routes/PublicRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";
// import { isAuthenticated } from "../utils/auth";

// export default function PublicRoute() {
//   return isAuthenticated() ? <Navigate to="/admin/" replace /> : <Outlet />;
// }
//

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  console.log("asgdja");
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  console.log("auehsd", isAuthenticated, loading);

  // If logged in → block login page
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
