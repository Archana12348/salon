import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./admin/context/AuthContext";
import { UserAuthProvider } from "./frontend/context/UserAuthContext";

// Redux
import { Provider } from "react-redux";
import store from "./frontend/components/redux/store"; // <-- path check kar lena

const root = ReactDOM.createRoot(document.getElementById("root"));
if (typeof window !== "undefined") {
  const resizeObserverErr = window.console.error;
  window.console.error = (...args) => {
    if (
      args[0]?.includes?.(
        "ResizeObserver loop completed with undelivered notifications",
      )
    ) {
      return;
    }
    resizeObserverErr(...args);
  };
}

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AuthProvider>
        <UserAuthProvider>
          <App />
        </UserAuthProvider>
      </AuthProvider>
    </React.StrictMode>
  </Provider>,
);

reportWebVitals();
