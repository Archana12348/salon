// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Users, Settings, Home, ChevronDown, ChevronRight } from "lucide-react";
// import { clsx } from "clsx";

// const Sidebar = () => {
//   const [openDropdown, setOpenDropdown] = useState({
//     product: false,
//     variant: false,
//     setting: false,
//     service: false,
//     booking: false,
//     user: false,
//   });

//   const toggleDropdown = (key) => {
//     setOpenDropdown((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <>
//       <div className="flex h-full flex-col">
//         <nav className="flex-1 overflow-y-auto p-2">
//           {/* Overview */}
//           <div className="mb-6">
//             <ul className="space-y-1">
//               <li>
//                 <NavLink
//                   to="/admin"
//                   className={({ isActive }) =>
//                     clsx(
//                       "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                       "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                       isActive && "bg-black-50"
//                     )
//                   }
//                 >
//                   <Home className="h-4 w-4" />
//                   <span>Dashboard</span>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           {/* Product Dropdown */}
//           {/* <div className="mb-6">
//             <h3
//               className="flex items-center justify-between px-2 text-xs font-semibold text-red-600 uppercase tracking-wider cursor-pointer"
//               onClick={() => toggleDropdown("product")}
//             >
//               <span className="flex items-center gap-2">
//                 <Package className="h-4 w-4" /> Product
//               </span>
//               {openDropdown.product ? <ChevronDown /> : <ChevronRight />}
//             </h3>
//             {openDropdown.product && (
//               <ul className="mt-2 ml-6 space-y-1">
//                 <li>
//                   <NavLink
//                     to="/products"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Products
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/headcategory"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Main Categories
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/parentcategory"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Parent Categories
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/childcategory"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Child Categories
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/producttags"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Product Tags
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/discounts"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Discounts
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/brands"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Brands
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </div> */}

//           {/* Variants Dropdown */}
//           {/* <div className="mb-6">
//             <h3
//               className="flex items-center justify-between px-2 text-xs font-semibold text-red-600 uppercase tracking-wider cursor-pointer"
//               onClick={() => toggleDropdown("variant")}
//             >
//               <span className="flex items-center gap-2">
//                 <List className="h-4 w-4" /> Variants
//               </span>
//               {openDropdown.variant ? <ChevronDown /> : <ChevronRight />}
//             </h3>
//             {openDropdown.variant && (
//               <ul className="mt-2 ml-6 space-y-1">
//                 <li>
//                   <NavLink
//                     to="/colors"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Colors
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/sizes"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Sizes
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/seasons"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Seasons
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     to="/fabric"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-black-50 dark:bg-red-950 text-red-600"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-black-50 dark:hover:bg-red-950 hover:text-red-600"
//                       )
//                     }
//                   >
//                     Fabric
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </div> */}
//           {/* Common */}
//           <div className="mb-6">
//             <h3 className="mb-2 px-2 text-xs font-semibold text-black uppercase tracking-wider">
//               Common
//             </h3>

//             <ul className="mt-2 ml-6 space-y-1">
//               {[
//                 { to: "/admin/category", label: "Categories" },
//                 { to: "/admin/subcategory", label: "SubCategories" },
//                 { to: "/admin/packages", label: "Packages" },
//                 { to: "/admin/banner", label: "Banners" },
//                 { to: "/admin/slider", label: "Sliders" },
//                 { to: "/admin/pages", label: "Pages" },
//               ].map((item) => (
//                 <li key={item.to}>
//                   <NavLink
//                     to={item.to}
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                         isActive && "bg-black-50"
//                       )
//                     }
//                   >
//                     {item.label}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Management */}
//           <div className="mb-6">
//             <h3 className="mb-2 px-2 text-xs text-black-400 font-bold uppercase tracking-wider">
//               Management
//             </h3>
//             <h4
//               className="flex items-center justify-between px-2 text-xs font-semibold text-black-600 uppercase tracking-wider cursor-pointer"
//               onClick={() => toggleDropdown("service")}
//             >
//               <span className="flex items-center gap-2">
//                 <Settings className="h-4 w-4" /> Services
//               </span>
//               {openDropdown.service ? <ChevronDown /> : <ChevronRight />}
//             </h4>
//             {openDropdown.service && (
//               <ul className="mt-2 ml-6 space-y-1">
//                 <li>
//                   <NavLink
//                     to="/admin/services/add"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                         isActive && "bg-black-50"
//                       )
//                     }
//                   >
//                     Add Service
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/admin/services"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                         isActive && "bg-black-50"
//                       )
//                     }
//                   >
//                     All services
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//             <h4
//               className="flex items-center justify-between px-2 text-xs font-semibold text-black-600 uppercase tracking-wider cursor-pointer"
//               onClick={() => toggleDropdown("booking")}
//             >
//               <span className="flex items-center gap-2">
//                 <Settings className="h-4 w-4" /> Booking
//               </span>
//               {openDropdown.booking ? <ChevronDown /> : <ChevronRight />}
//             </h4>
//             {openDropdown.booking && (
//               <ul className="mt-2 ml-6 space-y-1">
//                 <li>
//                   <NavLink
//                     to="/admin/bookings/add"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                         isActive && "bg-black-50"
//                       )
//                     }
//                   >
//                     Add Booking
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/admin/bookings"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                         isActive && "bg-black-50"
//                       )
//                     }
//                   >
//                     All Bookings
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//             <h4
//               className="flex items-center justify-between px-2 text-xs font-semibold text-black-600 uppercase tracking-wider cursor-pointer"
//               onClick={() => toggleDropdown("user")}
//             >
//               <span className="flex items-center gap-2">
//                 <Settings className="h-4 w-4" /> Users
//               </span>
//               {openDropdown.user ? <ChevronDown /> : <ChevronRight />}
//             </h4>
//             {openDropdown.user && (
//               <ul className="mt-2 ml-6 space-y-1">
//                 <li>
//                   <NavLink
//                     to="/admin/user/add"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                         isActive && "bg-black-50"
//                       )
//                     }
//                   >
//                     Add User
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/admin/user"
//                     className={({ isActive }) =>
//                       clsx(
//                         "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                         "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                         isActive && "bg-black-50"
//                       )
//                     }
//                   >
//                     All Users
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </div>

//           {/* HRM */}
//           <div className="mb-6">
//             <h3 className="mb-2 px-2 text-xs text-black-600 font-bold uppercase tracking-wider">
//               Settings
//             </h3>
//             <ul className="space-y-1">
//               <li>
//                 <NavLink
//                   to="/admin/customers"
//                   className={({ isActive }) =>
//                     clsx(
//                       "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                       "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                       isActive && "bg-black-50"
//                     )
//                   }
//                 >
//                   <Users className="h-4 w-4" /> Customer
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/admin/settings"
//                   className={({ isActive }) =>
//                     clsx(
//                       "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
//                       "text-black no-underline hover:no-underline hover:text-black focus:no-underline focus:text-black",
//                       isActive && "bg-black-500"
//                     )
//                   }
//                 >
//                   <Users className="h-4 w-4" /> General Settings
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
// //

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
              {
                to: "/admin/slider",
                label: "Sliders",
                icon: SlidersHorizontal,
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
                        "flex items-center gap-3 cursor-pointer"
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
                    isActive && linkActive
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
                    isActive && linkActive
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
                    isActive && linkActive
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
                    isActive && linkActive
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
                    isActive && linkActive
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
                    isActive && linkActive
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
                  isActive && linkActive
                )
              }
            >
              <UserCheck className="h-4 w-4" /> Customer
            </NavLink>

            <NavLink
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
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
