import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const authString = localStorage.getItem("user_auth");

  let isLoggedIn = false;

  if (authString) {
    try {
      const authData = JSON.parse(authString);
      isLoggedIn = !!authData.token; // token exist hai ya nahi
    } catch (error) {
      console.error("Invalid auth data", error);
    }
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{
        from: location.state?.from || location.pathname,
      }}
    />
  );
};

export default ProtectedRoute;
