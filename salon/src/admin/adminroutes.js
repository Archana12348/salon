import { Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AdminHeader from "./layout/AdminHeader";
import User from "./pages/users/MainUsersPage";
import UserAdd from "./pages/users/NewUser";
import UserEdit from "./pages/users/EditUser";
import UserCustomer from "./pages/users/MainCustomerPage";
import Category from "./pages/category/headcategory/HeadCategoriesTable";
import CategoryAdd from "./pages/category/headcategory/AddHeadCategory";
import CategoryEdit from "./pages/category/headcategory/EditHeadCategoryPage";
import SubCategory from "./pages/category/parentcategory/TableParentCategories";
import SubCategoryAdd from "./pages/category/parentcategory/AddParentCategory";
import SubCategoryEdit from "./pages/category/parentcategory/EditParentCategory";
import Packages from "./pages/packages/PackagesTable";
import PackagesAdd from "./pages/packages/AddPackages";
import PackagesEdit from "./pages/packages/EditPackages";
import Reviews from "./pages/review/ReviewsPage";
import ReviewsAdd from "./pages/review/AddPackages";
import ReviewsEdit from "./pages/review/EditPackages";
import Contact from "./pages/contacts/ContactsTable";
import ContactAdd from "./pages/contacts/AddContact";
import Services from "./pages/services/RolesTable";
import ServicesAdd from "./pages/services/AddRoles";
import ServicesEdit from "./pages/services/EditRoles";
import Booking from "./pages/bookings/SeasonTable";
import BookingAdd from "./components/features/booking-flow/BookingPage";
import BookingEdit from "./components/features/booking-flow/BookingPage";
import BookingAddss from "./pages/bookings/AddService";
import BookingAddssedit from "./pages/bookings/EditService";

import Banner from "./components/content/Banner/BannerManagement";
import BannerAdd from "./components/content/Banner/AddBannerPage";
import BannerEdit from "./components/content/Banner/BannerFormPage";
import Slider from "./components/content/Slider/SliderManagement";
import SliderAdd from "./components/content/Slider/AddSliderPage";
import SliderEdit from "./components/content/Slider/EditSliderPage";
import Page from "./pages/sizes/SizesTable";
import PageAdd from "./pages/sizes/AddSize";
import PageEdit from "./pages/sizes/EditSize";

import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/SignupPage";
import Logout from "./pages/auth/Logout";
import Settings from "./pages/SettingsPage";

import ProtectedRoute from "./routes/ProtectedRoute";

export const AdminRoutes = (
  <>
    {/* PUBLIC ROUTES */}
    <Route element={<PublicRoute />}>
      <Route path="admin/auth/login" element={<Login />} />
      <Route path="admin/auth/register" element={<Register />} />
    </Route>

    <Route path="admin/auth/logout" element={<Logout />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="header" element={<AdminHeader />} />
        <Route path="user" element={<User />} />
        <Route path="customer" element={<User />} />
        <Route path="user/add" element={<UserAdd />} />
        <Route path="user/:id/edit" element={<UserEdit />} />
        <Route path="customers" element={<UserCustomer />} />
        <Route path="category" element={<Category />} />
        <Route path="category/add" element={<CategoryAdd />} />
        <Route path="category/:id/edit" element={<CategoryEdit />} />
        <Route path="subcategory" element={<SubCategory />} />
        <Route path="subcategory/add" element={<SubCategoryAdd />} />
        <Route path="subcategory/:id/edit" element={<SubCategoryEdit />} />
        <Route path="packages" element={<Packages />} />
        <Route path="packages/add" element={<PackagesAdd />} />
        <Route path="packages/:id/edit" element={<PackagesEdit />} />
        {/* <Route path="services" element={<Services />} />
        <Route path="services/add" element={<ServicesAdd />} />
        <Route path="services/:id/edit" element={<ServicesEdit />} />
        <Route path="bookings" element={<Booking  />} />
        <Route path="bookings/add" element={<BookingAdd />} />
        <Route path="bookings/:id/edit" element={<BookingEdit />} /> */}
        <Route path="services" element={<Booking />} />
        <Route path="services/add" element={<BookingAddss />} />
        <Route path="services/:id/edit" element={<BookingAddssedit />} />
        <Route path="bookings" element={<Services />} />
        <Route path="bookings/add" element={<BookingAdd />} />
        <Route path="bookings/:id/edit" element={<BookingEdit />} />
        <Route path="banner" element={<Banner />} />
        <Route path="banner/add" element={<BannerAdd />} />
        <Route path="banner/:id/edit" element={<BannerEdit />} />
        <Route path="slider" element={<Slider />} />
        <Route path="slider/add" element={<SliderAdd />} />
        <Route path="slider/:id/edit" element={<SliderEdit />} />
        <Route path="pages" element={<Page />} />
        <Route path="pages/add" element={<PageAdd />} />
        <Route path="pages/:id/edit" element={<PageEdit />} />
        <Route path="bookingadd" element={<BookingAddss />} />
        <Route path="bookingadd/:id/edit" element={<BookingAddssedit />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contact" element={<Contact />} />
        <Route path="contact/add" element={<ContactAdd />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/add" element={<ReviewsAdd />} />
        <Route path="reviews/:id/edit" element={<ReviewsEdit />} />
      </Route>
    </Route>
  </>
);
