// routes/ProtectedRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";
// import { isAuthenticated } from "../utils/auth";

// export default function ProtectedRoute() {
//   return isAuthenticated() ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/admin/auth/login" replace />
//   );
// }

// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { isAuthenticated } from "../utils/auth";

// export default function ProtectedRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);

//   // 🔍 DEBUG: mount / unmount check
//   useEffect(() => {
//     console.log("ProtectedRoute mounted");
//     return () => console.log("ProtectedRoute unmounted");
//   }, []);

//   // 🔐 Auth check
//   useEffect(() => {
//     const checkAuth = async () => {
//       const result = await isAuthenticated();
//       setAuthenticated(result);
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   if (loading) return null;

//   if (!authenticated) {
//     return <Navigate to="/admin/auth/login" replace />;
//   }

//   return children;
// }

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or loader

  console.log(isAuthenticated, loading);
  debugger;
  // if (!isAuthenticated ) {
  //   return <Navigate to="/admin/auth/login" replace />;
  // }

  return <Outlet />;
}
