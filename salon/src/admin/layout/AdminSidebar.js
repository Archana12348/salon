import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ChevronDown,
  ChevronRight,
  Layers,
  Layers3,
  Package,
  FileText,
  Image,
  SlidersHorizontal,
  Briefcase,
  List,
  PlusCircle,
  CalendarCheck,
  ClipboardList,
  CalendarPlus,
  Users,
  UserPlus,
  UserCheck,
  Settings,
  Contact,
} from "lucide-react";
import { clsx } from "clsx";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState({
    product: false,
    variant: false,
    setting: false,
    service: false,
    booking: false,
    user: false,
  });

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const linkBase =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-black no-underline";

  const linkHover = "hover:bg-[#00CED1]/10 hover:text-[#00CED1]";

  const linkActive = "bg-[#00CED1]/10 text-[#00CED1]";

  return (
    <div className="flex h-full flex-col">
      <nav className="flex-1 overflow-y-auto p-2">
        {/* OVERVIEW */}
        <div className="mb-6">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  clsx(linkBase, linkHover, isActive && linkActive)
                }
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* COMMON */}
        <div className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[#00CED1]">
            Common
          </h3>

          <ul className="ml-6 space-y-1">
            {[
              {
                to: "/admin/category",
                label: "Categories",
                icon: Layers,
              },
              {
                to: "/admin/subcategory",
                label: "SubCategories",
                icon: Layers3,
              },
              {
                to: "/admin/packages",
                label: "Packages",
                icon: Package,
              },
              {
                to: "/admin/banner",
                label: "Banners",
                icon: Image,
              },
              // {
              //   to: "/admin/slider",
              //   label: "Sliders",
              //   icon: SlidersHorizontal,
              // },
              {
                to: "/admin/reviews",
                label: "Love Letter",
                icon: Image,
              },
              { to: "/admin/pages", label: "Pages", icon: FileText },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        linkBase,
                        linkHover,
                        isActive && linkActive,
                        "flex items-center gap-3 cursor-pointer",
                      )
                    }
                  >
                    <Icon size={18} className="shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* MANAGEMENT */}
        <div className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#00CED1]">
            Management
          </h3>

          {/* SERVICES */}
          <h4
            className="flex items-center justify-between px-2 text-xs font-semibold uppercase cursor-pointer hover:text-[#00CED1]"
            onClick={() => toggleDropdown("service")}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Services
            </span>
            {openDropdown.service ? <ChevronDown /> : <ChevronRight />}
          </h4>

          {openDropdown.service && (
            <ul className="ml-6 mt-2 space-y-1">
              <NavLink
                to="/admin/services/add"
                className={({ isActive }) =>
                  clsx(
                    linkBase,
                    linkHover,
                    "cursor-pointer",
                    isActive && linkActive,
                  )
                }
              >
                <PlusCircle className="h-4 w-4" /> Add Service
              </NavLink>

              <NavLink
                to="/admin/services"
                className={({ isActive }) =>
                  clsx(
                    linkBase,
                    linkHover,
                    "cursor-pointer",
                    isActive && linkActive,
                  )
                }
              >
                <List className="h-4 w-4" /> All Services
              </NavLink>
            </ul>
          )}

          {/* BOOKINGS */}
          <h4
            className="mt-3 flex items-center justify-between px-2 text-xs font-semibold uppercase cursor-pointer hover:text-[#00CED1]"
            onClick={() => toggleDropdown("booking")}
          >
            <span className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" /> Booking
            </span>
            {openDropdown.booking ? <ChevronDown /> : <ChevronRight />}
          </h4>

          {openDropdown.booking && (
            <ul className="ml-6 mt-2 space-y-1">
              <NavLink
                to="/admin/bookings/add"
                className={({ isActive }) =>
                  clsx(
                    linkBase,
                    linkHover,
                    "cursor-pointer",
                    isActive && linkActive,
                  )
                }
              >
                <CalendarPlus className="h-4 w-4" /> Add Booking
              </NavLink>

              <NavLink
                to="/admin/bookings"
                className={({ isActive }) =>
                  clsx(
                    linkBase,
                    linkHover,
                    "cursor-pointer",
                    isActive && linkActive,
                  )
                }
              >
                <ClipboardList className="h-4 w-4" /> All Bookings
              </NavLink>
            </ul>
          )}

          {/* USERS */}
          <h4
            className="mt-3 flex items-center justify-between px-2 text-xs font-semibold uppercase cursor-pointer hover:text-[#00CED1]"
            onClick={() => toggleDropdown("user")}
          >
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Users
            </span>
            {openDropdown.user ? <ChevronDown /> : <ChevronRight />}
          </h4>

          {openDropdown.user && (
            <ul className="ml-6 mt-2 space-y-1">
              <NavLink
                to="/admin/user/add"
                className={({ isActive }) =>
                  clsx(
                    linkBase,
                    linkHover,
                    "cursor-pointer",
                    isActive && linkActive,
                  )
                }
              >
                <UserPlus className="h-4 w-4" /> Add User
              </NavLink>

              <NavLink
                to="/admin/user"
                className={({ isActive }) =>
                  clsx(
                    linkBase,
                    linkHover,
                    "cursor-pointer",
                    isActive && linkActive,
                  )
                }
              >
                <Users className="h-4 w-4" /> All Users
              </NavLink>
            </ul>
          )}
        </div>

        {/* SETTINGS */}
        <div className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#00CED1]">
            Settings
          </h3>

          <ul className="space-y-1">
            <NavLink
              to="/admin/customers"
              className={({ isActive }) =>
                clsx(
                  linkBase,
                  linkHover,
                  "cursor-pointer",
                  isActive && linkActive,
                )
              }
            >
              <UserCheck className="h-4 w-4" /> Customer
            </NavLink>
            <NavLink
              to="/admin/contact"
              className={({ isActive }) =>
                clsx(
                  linkBase,
                  linkHover,
                  "cursor-pointer",
                  isActive && linkActive,
                )
              }
            >
              <Contact className="h-4 w-4" /> Customer Enquiries
            </NavLink>
            {/* <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                clsx(
                  linkBase,
                  linkHover,
                  "cursor-pointer",
                  isActive && linkActive
                )
              }
            >
              <Settings className="h-4 w-4" /> General Settings
            </NavLink> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
