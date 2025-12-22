import React, { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiMenu,
} from "react-icons/fi";
import { FaChevronDown, FaTags } from "react-icons/fa";
import MegaMenu from "./MegaMenu"; // 🔹 Added
import MegaMenuMobile from "./MegaMenuMobile";
import { useNavigate } from "react-router-dom";
import CartDrawer from "../../components/common/drawer/CartDrawer";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef();
  const [showMegaMenu, setShowMegaMenu] = useState(false); // 🔹 Added
  const [openMenu, setOpenMenu] = useState(null); // track open dropdowns
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  // close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUserLoggedIn(false);
    setAccountOpen(false);
  };

  return (
    <header className="bg-[#14532D] text-white shadow-md font-[Poppins] relative z-50">
      {/* 🔹 Top Bar (Desktop) */}
      <div className="hidden md:flex items-center justify-between px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-[#FF9C00]">
          <img src="/hero/hero_1_3.png" alt="Logo" className="w-12 h-12" />
          Premier Grocery
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 mx-6 max-w-xl">
          <input
            type="text"
            placeholder="Search for groceries..."
            className="w-full px-4 py-2 rounded-l-full border-none focus:outline-none text-black"
          />
          <button className="bg-[#629D23] px-4 rounded-r-full hover:bg-[#e58b00] transition">
            <FiSearch className="text-white text-xl" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {/* Account Icon with Dropdown */}
          <div className="relative" ref={accountRef}>
            <div
              onClick={() => setAccountOpen(!accountOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#FF9C00] transition-all cursor-pointer group"
            >
              <FiUser className="text-[#017D03] group-hover:text-white text-lg" />
            </div>

            {accountOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-[#017D03] rounded-xl shadow-lg p-2 z-50 animate-dropdown">
                {!userLoggedIn ? (
                  <>
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                      onMouseDown={() => {
                        console.log(
                          "Login button clicked! Navigating to Login page..."
                        );
                        navigate("/login");
                        setAccountOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      Login
                    </button>

                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                      onMouseDown={() => {
                        navigate("/signup");
                        setAccountOpen(false); // ✅ dropdown close
                        setMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="#"
                      className="block px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="#"
                      className="block px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                    >
                      Wallet
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 rounded-md"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {[FiHeart, FiShoppingCart].map((Icon, index) => (
            <div
              key={index}
              onMouseDown={() => {
                if (index === 1) {
                  setCartOpen(true); // CART OPEN NOW WORKS ⚡
                }
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#FF9C00] transition-all cursor-pointer group"
            >
              <Icon className="text-[#017D03] group-hover:text-white text-lg ga" />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Mobile Top (Row 1: Logo + Icons) */}
      <div className="flex md:hidden items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 text-xl font-bold text-[#FF9C00]">
          <img src="/hero/hero_1_3.png" alt="Logo" className="w-12 h-12" />
          Premier Grocery
        </div>
      </div>

      {/* 🔹 Mobile Second Row (Search + Menu) */}
      <div className="flex md:hidden items-center justify-between px-4 pb-3">
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search for groceries..."
            className="w-full px-4 py-2 rounded-l-full border-none focus:outline-none text-black"
          />
          <button className="bg-[#629D23] px-4 rounded-r-full hover:bg-[#e58b00] transition">
            <FiSearch className="text-white text-xl" />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-3 p-2 rounded-full hover:bg-[#FF9C00] transition"
        >
          <FiMenu className="text-2xl text-white" />
        </button>
      </div>

      {/* 🔹 Bottom Navigation (Desktop Only) */}
      <nav
        className="hidden md:flex items-center justify-center relative bg-[#14532D] text-white 
         pb-2"
        onMouseLeave={() => setShowMegaMenu(false)}
      >
        <div className="flex items-center space-x-10 text-lg ">
          <Link to="/" className="hover:text-[#FF9C00]">
            Home
          </Link>

          {/* 🔹 Shop + Well Being share one Mega Menu */}
          <div
            className="relative flex items-center space-x-1 cursor-pointer hover:text-[#FF9C00]"
            onMouseEnter={() => setShowMegaMenu(true)}
          >
            <span>Shop</span>
            <FaChevronDown className="text-sm mt-[2px]" />
          </div>

          <div
            className="relative flex items-center space-x-1 cursor-pointer hover:text-[#FF9C00]"
            onMouseEnter={() => setShowMegaMenu(true)}
          >
            <span>Well Being</span>
            <FaChevronDown className="text-sm mt-[2px]" />
          </div>
          <Link to="#" className="hover:text-[#FF9C00]">
            Contact
          </Link>
        </div>
        {/* 🔹 Mega Menu (Shared for Shop & Well Being) */}
        {showMegaMenu && <MegaMenu />}

        <div className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer group">
          <div className="flex items-center gap-2 bg-[#FF9C00] px-4 py-1 rounded-full text-white font-semibold transition-all duration-300 group-hover:bg-white group-hover:text-[#017D03] animate-bounce">
            <FaTags className="text-lg animate-pulse" />
            <span className="animate-pulse">Today's Deal</span>
          </div>
        </div>
      </nav>

      {/* 🔹 Mobile Right-side Half Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="fixed mt-4 right-0 top-[115px] w-[50vw] h-[100vh] bg-[#017D03] text-white p-6 rounded-l-3xl shadow-2xl z-40 animate-slideIn md:hidden">
            <div className="flex flex-col space-y-6 text-lg font-semibold">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#FF9C00] transition"
              >
                Home
              </Link>

              {/* SHOP DROPDOWN */}
              <div>
                <button
                  onClick={() => toggleMenu("shop")}
                  className="w-full flex justify-between items-center hover:text-[#FF9C00] transition"
                >
                  <span>Shop</span>
                  <FaChevronDown
                    className={`ml-2 transition-transform duration-300 ${
                      openMenu === "shop" ? "rotate-180 text-[#FF9C00]" : ""
                    }`}
                  />
                </button>
                {openMenu === "shop" && (
                  <div className="mt-3">
                    <MegaMenuMobile />
                  </div>
                )}
              </div>

              {/* WELL BEING DROPDOWN */}
              <div>
                <button
                  onClick={() => toggleMenu("wellbeing")}
                  className="w-full flex justify-between items-center hover:text-[#FF9C00] transition"
                >
                  <span>Well Being</span>
                  <FaChevronDown
                    className={`ml-2 transition-transform duration-300 ${
                      openMenu === "wellbeing"
                        ? "rotate-180 text-[#FF9C00]"
                        : ""
                    }`}
                  />
                </button>
                {openMenu === "wellbeing" && (
                  <div className="mt-3">
                    <MegaMenuMobile />
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                to="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#FF9C00] transition"
              >
                Contact
              </Link>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 bg-[#FF9C00] px-4 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:bg-white hover:text-[#017D03] animate-bounce">
                <FaTags className="text-lg animate-pulse" />
                <span className="animate-pulse">Today's Deal</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 🔹 Bottom Fixed Navigation (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center py-2 md:hidden z-50">
        {/* Cart */}
        <div
          onClick={() => setCartOpen(true)}
          className="flex flex-col items-center text-[#017D03] text-xs cursor-pointer"
        >
          <FiShoppingCart className="text-2xl" />
          <span>Cart</span>
        </div>

        {/* Wishlist */}
        <div className="flex flex-col items-center text-[#017D03] text-xs">
          <FiHeart className="text-2xl" />
          <span>Wishlist</span>
        </div>

        {/* Account with Dropdown */}
        <div className="relative" ref={accountRef}>
          <div
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex flex-col items-center text-[#017D03] text-xs cursor-pointer"
          >
            <FiUser className="text-2xl" />
            <span>Account</span>
          </div>

          {accountOpen && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-40 bg-white text-[#017D03] rounded-xl shadow-lg p-2 z-50 animate-dropdown">
              {!userLoggedIn ? (
                <>
                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                    onClick={() => {
                      navigate("/login");
                      setAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Login
                  </button>

                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                    onClick={() => {
                      navigate("/signup");
                      setAccountOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="#"
                    className="block px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-3 py-2 hover:bg-[#FF9C00]/20 rounded-md"
                  >
                    Wallet
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 rounded-md"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Categories (Opens Right Side Menu) */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col items-center text-[#017D03] text-xs cursor-pointer"
        >
          <FiMenu className="text-2xl" />
          <span>Categories</span>
        </div>
      </div>
      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </header>
  );
};

export default Header;
