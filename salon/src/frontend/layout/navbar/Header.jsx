import { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Search,
  MapPin,
  Menu,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function HeaderWithVideo() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [userOpen, setUserOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const closeTimerRef = useRef(null);
  const userRef = useRef(null);

  const isHomePage = location.pathname === "/";

  /* ---------------- AUTH ---------------- */
  const auth = JSON.parse(localStorage.getItem("user_auth"));
  const user = auth?.user;

  /* ---------------- FETCH CATEGORY (ONE TIME) ---------------- */
  useEffect(() => {
    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/category"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setCategories(data.data || []);
        }
      })
      .catch((err) => console.error("Category API error", err));
  }, []);

  /* ---------------- CLOSE USER DROPDOWN ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- MENU HANDLERS ---------------- */
  const openMenu = (menu) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(menu);
  };

  const closeMenuWithDelay = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  /* ---------------- NAVBAR SCROLL LOGIC (ONE useEffect) ---------------- */
  useEffect(() => {
    let handleScroll;

    if (isHomePage) {
      window.scrollTo(0, 0);
      setShowNavbar(false);

      handleScroll = () => {
        setShowNavbar(window.scrollY > 120);
      };

      window.addEventListener("scroll", handleScroll);
    } else {
      setShowNavbar(true);
    }

    return () => {
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isHomePage]);
  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("user_auth");
    navigate("/login");
  };

  /* ---------------- USER ICON ---------------- */
  const UserDropdown = ({ color = "text-black" }) => (
    <div className="relative" ref={userRef}>
      <div
        className="flex items-center gap-2 cursor-pointer overflow-hidden"
        onClick={() => setUserOpen((p) => !p)}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <User size={18} className={color} />
        )}
        <span className={`hidden sm:block text-xs ${color}`}>{user?.name}</span>
      </div>

      {userOpen && (
        <div className="absolute right-0 top-9 w-44 bg-white text-black rounded-xl shadow-lg z-50 border over">
          <Link
            className="flex gap-2 px-4 py-2 hover:bg-gray-100"
            to="/dashboard"
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link
            className="flex gap-2 px-4 py-2 hover:bg-gray-100"
            to="/bookings"
          >
            <Calendar size={16} /> Bookings
          </Link>

          <button
            onClick={handleLogout}
            className="flex gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ================= FIXED NAVBAR ================= */}
      {showNavbar && (
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md text-black transition-all duration-500">
          <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-3 sm:py-4">
            <div className="flex gap-3 sm:gap-4">
              <Search size={16} className="sm:size-[18px] cursor-pointer" />
              <MapPin size={16} className="sm:size-[18px] cursor-pointer" />
              <Menu
                className="cursor-pointer md:hidden  sm:size-[18px]"
                size={16}
                onClick={() => setMobileMenuOpen(true)}
              />
            </div>

            <h2
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-center whitespace-nowrap"
              style={{ fontFamily: "var(--font-heading--family)" }}
            >
              LA VIE JUMERIAH
            </h2>

            <div className="flex gap-3 sm:gap-4">
              {!user ? (
                <Link to="/login">
                  <User
                    size={16}
                    className="sm:size-[18px] cursor-pointer text-black"
                  />
                </Link>
              ) : (
                <UserDropdown />
              )}
              <Calendar size={16} className="sm:size-[18px] cursor-pointer" />
            </div>
          </div>

          <nav
            className=" hidden md:flex text-black
          ' flex-wrap justify-center
            gap-x-4 gap-y-2
            px-3 pb-3
            text-[10px] sm:text-xs md:text-sm
            uppercase tracking-widest
            text-center
         "
          >
            <Link
              to="/"
              className="text-black"
              style={{ fontFamily: "var(--font-heading--family)" }}
            >
              Home
            </Link>
            <Link
              to="#"
              className="text-black"
              style={{ fontFamily: "var(--font-heading--family)" }}
            >
              About Us
            </Link>

            <div
              className="relative"
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={closeMenuWithDelay}
            >
              <span
                className="cursor-pointer hover:underline text-black"
                style={{ fontFamily: "var(--font-heading--family)" }}
              >
                Services
              </span>
              {activeMenu === "services" && (
                <MegaMenu
                  categories={categories}
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenuWithDelay}
                />
              )}
            </div>

            <Link
              to="/products"
              className="text-black"
              style={{ fontFamily: "var(--font-heading--family)" }}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-black"
              style={{ fontFamily: "var(--font-heading--family)" }}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}

      {/* ================= HOME VIDEO HEADER ================= */}
      {isHomePage && (
        <header className="relative w-full h-screen overflow-hidden">
          <div className=" ml-16 flex items-center justify-between px-4 mt-[16px] md:hidden absolute top-0 left-0 w-full z-20 text-white">
            <Menu
              className="cursor-pointer mt-2"
              size={20}
              onClick={() => setMobileMenuOpen(true)}
            />
          </div>
          {/* Background Video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/gallery/videobg.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Overlay */}
          {/* <div className="absolute inset-0 " /> */}
          {/* Content */}
          <div className="relative z-10 text-white h-full flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
              <div className="flex gap-3 sm:gap-4">
                <Search size={20} className="cursor-pointer" />
                <MapPin size={20} className="cursor-pointer" />
              </div>

              {/* Center Title */}
              <h1
                className="absolute left-1/2 -translate-x-1/2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-center mt-4 md:mt-11 lg:mt-4"
                style={{ fontFamily: "var(--font-heading--family)" }}
              >
                LA VIE JUMERIAH
              </h1>

              <div className="flex gap-3 sm:gap-4">
                <Link to="/login">
                  <User size={20} className="cursor-pointer text-white" />
                </Link>
                <Calendar size={20} className="cursor-pointer" />
              </div>
            </div>

            <nav
              className="hidden md:flex mt-7 md:mt-11 lg:mt-7  flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest px-4 text-center text-white"
              // style={{ fontFamily: "var(--font-heading--family)" }}
            >
              <Link
                to="/"
                className="text-white"
                style={{ fontFamily: "var(--font-heading--family)" }}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white"
                style={{ fontFamily: "var(--font-heading--family)" }}
              >
                About Us
              </Link>

              <div
                className="relative"
                onMouseEnter={() => openMenu("services")}
              >
                <span
                  className="cursor-pointer hover:underline text-white"
                  style={{ fontFamily: "var(--font-heading--family)" }}
                >
                  Services
                </span>
                {activeMenu === "services" && (
                  <MegaMenu
                    categories={categories}
                    onMouseEnter={cancelClose}
                    onMouseLeave={closeMenuWithDelay}
                  />
                )}
              </div>

              <Link
                to="/products"
                className="hover:underline text-white"
                style={{ fontFamily: "var(--font-heading--family)" }}
              >
                Products
              </Link>
              <Link to="/contact" className="text-white">
                Contact Us
              </Link>
            </nav>

            {/* BUTTONS */}
            <div
              className="mt-auto mb-16 sm:mb-24 flex flex-col sm:flex-row gap-6 justify-center px-4"
              style={{ fontFamily: "var(--font-heading--family)" }}
            >
              {/* Shop Now */}
              <button
                className="
                 relative overflow-hidden
                 px-8 sm:px-10 py-3
                 text-xs sm:text-sm uppercase tracking-wider font-semibold
                 rounded-full
                 bg-gradient-to-r from-[#00CED1] via-[#20B2AA] to-[#00CED1]
               text-black
                 shadow-[0_0_20px_rgba(0,206,209,0.5)]
                 transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,206,209,0.9)]
                 "
              >
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition" />
              </button>
              {/* Book Appointment */}
              <button
                className="
               relative overflow-hidden
               px-8 sm:px-10 py-3
               text-xs sm:text-sm uppercase tracking-wider font-semibold
               rounded-full
               border border-[#00CED1]
              text-[#00CED1]
               bg-transparent
               shadow-[0_0_15px_rgba(0,206,209,0.4)]
               transition-all duration-300
               hover:bg-[#00CED1] hover:text-white
              hover:scale-105 hover:shadow-[0_0_35px_rgba(0,206,209,0.9)]
              "
                onClick={() => navigate("/appointment")}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </header>
      )}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
      />
    </>
  );
}
