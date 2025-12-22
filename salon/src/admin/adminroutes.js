import { Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AdminHeader from "./layout/AdminHeader";

export const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="header" element={<AdminHeader />} />
  </Route>
);
