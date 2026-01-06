import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./admin/context/AuthContext";

// Redux
import { Provider } from "react-redux";
import store from "./frontend/components/redux/store"; // <-- path check kar lena

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
