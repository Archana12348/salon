import { Route } from "react-router-dom";
import FrontLayout from "./layout/FrontLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProductPage from "./components/sections/ProductPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserDashboard from "./pages/UserProfile/UserDashboard";
import UserBookings from "./pages/UserProfile/UserBookings";
import AboutUs from "./pages/aboutus/AboutUs";
import Team from "./pages/team/Team";
import ProductnewProfile from "./pages/ProductDetails";
import ForgetPassword from "./pages/auth/Forget";
import ContactUs from "./pages/contactus/ContactUs";
import BookingPage from "./pages/features/booking-flow/BookingPage";
import ServicesPage from "./pages/servicedata/ServiceFetch";
import ServiceView from "./pages/servicedata/ServiceView";
import ProtectedRoute from "./route/ProtectedRoute";

// import NotFound from "./pages/NotFound";

export const FrontendRoutes = (
  <>
    {/* 🔹 FRONT LAYOUT ROUTES */}
    <Route element={<FrontLayout />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="userprofile" element={<UserProfile />} />
      <Route path="service/:slug" element={<ServicesPage />} />
      <Route path="service/:slug/:slug" element={<ServicesPage />} />
      <Route path="/:slug" element={<ServiceView />} />
      <Route path="aboutus/:slug" element={<AboutUs />} />
      <Route path="team" element={<Team />} />
      <Route path="userprofile/:slug" element={<UserProfile />} />
      <Route path="contactUs" element={<ContactUs />} />
      <Route element={<ProtectedRoute />}>
        <Route path="appointment" element={<BookingPage />} />
      </Route>

      <Route path="userdashboard" element={<UserDashboard />} />
      <Route path="userbooking" element={<UserBookings />} />
    </Route>

    <Route path="productdetails" element={<ProductnewProfile />} />
    <Route path="contactUs" element={<ContactUs />} />

    {/* 🔹 LOGIN / SIGNUP OUTSIDE FRONT LAYOUT */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/salon/:slug" element={<AboutUs />} />
  </>
);
