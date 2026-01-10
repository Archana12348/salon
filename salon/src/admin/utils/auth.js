// utils/auth.js
// export const isAuthenticated = () => {
//   return true; // or cookie
//   return !!localStorage.getItem("token"); // or cookie
// };

// utils/auth.js
// export const isAuthenticated = () => {
//   return document.cookie
//     .split("; ")
//     .some((row) => row.startsWith("auth_token="));
// };

// export const isAuthenticated = async () => {
//   try {
//     const res = await fetch("https://jumeirah.premierwebtechservices.com/backend/api/auth/check", {
//       credentials: "include",
//     });

//     console.log("hello", res);
//     debugger;

//     return res.ok;
//   } catch {
//     return false;
//   }
// };

export const isAuthenticated = async () => {
  try {
    const res = await fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/auth/check",
      {
        method: "GET",
        credentials: "include",
      }
    );

    // Backend reachable but user not authenticated
    if (res.status === 401 || res.status === 403) {
      return false;
    }

    return res.ok; // true only for 200–299
  } catch (error) {
    // 🔴 This runs for ERR_CONNECTION_REFUSED, CORS issues, network down
    console.error("Auth check failed:", error.message);

    return false; // treat as logged out
  }
};

// utils/auth.js
export const logout = () => {
  // Clear browser storage
  localStorage.clear();
  sessionStorage.clear();

  // Clear auth cookie (if not httpOnly, you can do it in JS)
  document.cookie =
    "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to login page
  window.location.replace("/admin/auth/login"); // replace prevents back navigation
};
