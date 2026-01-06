// import { useEffect, useState, useRef } from "react";
// import { User, Calendar, Search, MapPin } from "lucide-react";
// import { Link } from "react-router-dom";
// import MegaMenu from "./MegaMenu";

// export default function HeaderWithVideo() {
//   const [showNavbar, setShowNavbar] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const openMenu = (menu) => setActiveMenu(menu);
//   const closeMenu = () => setActiveMenu(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 120) {
//         setShowNavbar(true);
//       } else {
//         setShowNavbar(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   return (
//     <>
//       {/* SCROLL NAVBAR */}
//       <div
//         className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md text-black transition-all duration-500 ${
//           showNavbar
//             ? "translate-y-0 opacity-100"
//             : "-translate-y-full opacity-0"
//         }`}
//       >
//         {/* TOP ROW */}
//         <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-3 sm:py-4">
//           {/* LEFT ICONS */}
//           <div className="flex gap-3 sm:gap-4">
//             <Search size={16} className="sm:size-[18px] cursor-pointer" />
//             <MapPin size={16} className="sm:size-[18px] cursor-pointer" />
//           </div>

//           {/* LOGO / TITLE */}
//           <h2
//             className="text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-center whitespace-nowrap"
//             style={{ fontFamily: "var(--font-heading--family)" }}
//           >
//             LA VIE JUMERIAH
//           </h2>

//           {/* RIGHT ICONS */}
//           <div className="flex gap-3 sm:gap-4">
//             <User size={16} className="sm:size-[18px] cursor-pointer" />
//             <Calendar size={16} className="sm:size-[18px] cursor-pointer" />
//           </div>
//         </div>

//         {/* NAV LINKS */}
//         <nav
//           className="
//       flex flex-wrap justify-center
//       gap-x-4 gap-y-2
//       px-3 pb-3
//       text-[10px] sm:text-xs md:text-sm
//       uppercase tracking-widest
//       text-center
//     "
//           style={{ fontFamily: "var(--font-heading--family)" }}
//         >
//           <Link to="#">Home</Link>
//           <Link to="#">About Us</Link>
//           {/* ===== SERVICES ===== */}
//           <div
//             className="relative"
//             onMouseEnter={() => openMenu("services")}
//             onMouseLeave={closeMenu}
//           >
//             <Link to="#" className="hover:underline">
//               Services
//             </Link>

//             {activeMenu === "services" && <MegaMenu type="services" />}
//           </div>

//           {/* ===== PRODUCTS ===== */}
//           <div
//             className="relative"
//             onMouseEnter={() => openMenu("products")}
//             onMouseLeave={closeMenu}
//           >
//             <Link to="#" className="hover:underline">
//               Products
//             </Link>

//             {activeMenu === "products" && <MegaMenu type="products" />}
//           </div>

//           <Link to="#">Contact Us</Link>
//         </nav>
//       </div>

//       <header className="relative w-full h-screen overflow-hidden">
//         {/* Background Video */}
//         <video
//           className="absolute top-0 left-0 w-full h-full object-cover"
//           src="/gallery/videobg.mp4"
//           autoPlay
//           muted
//           loop
//           playsInline
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/40" />

//         {/* Content */}
//         <div className="relative z-10 text-white h-full flex flex-col">
//           {/* TOP BAR */}
//           <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
//             {/* Left Icons */}
//             <div className="flex gap-3 sm:gap-4">
//               <Search size={20} className="cursor-pointer" />
//               <MapPin size={20} className="cursor-pointer" />
//             </div>

//             {/* Center Title */}
//             <h1
//               className="absolute left-1/2 -translate-x-1/2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-center mt-4 md:mt-11 lg:mt-4"
//               style={{ fontFamily: "var(--font-heading--family)" }}
//             >
//               LA VIE JUMERIAH
//             </h1>

//             {/* Right Icons */}
//             <div className="flex gap-3 sm:gap-4">
//               <User size={20} className="cursor-pointer" />
//               <Calendar size={20} className="cursor-pointer" />
//             </div>
//           </div>

//           {/* NAVBAR */}
//           <nav
//             className=" mt-7 md:mt-11 lg:mt-7 flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest px-4 text-center"
//             style={{ fontFamily: "var(--font-heading--family)" }}
//           >
//             <Link to="#">Home</Link>
//             <Link to="#">About Us</Link>
//             {/* ===== SERVICES ===== */}
//             <div
//               className="relative"
//               onMouseEnter={() => openMenu("services")}
//               onMouseLeave={closeMenu}
//             >
//               <Link to="#" className="hover:underline">
//                 Services
//               </Link>

//               {activeMenu === "services" && <MegaMenu type="services" />}
//             </div>

//             {/* ===== PRODUCTS ===== */}
//             <div
//               className="relative"
//               onMouseEnter={() => openMenu("products")}
//               onMouseLeave={closeMenu}
//             >
//               <Link to="#" className="hover:underline">
//                 Products
//               </Link>

//               {activeMenu === "products" && <MegaMenu type="products" />}
//             </div>

//             <Link to="#">Contact Us</Link>
//           </nav>

//           {/* BUTTONS */}
//           <div
//             className="mt-auto mb-16 sm:mb-24 flex flex-col sm:flex-row gap-4 justify-center px-4"
//             style={{ fontFamily: "var(--font-heading--family)" }}
//           >
//             <button className="border bg-[#00CED1] text-black border-[#00CED1] hover:border-white px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase hover:bg-white transition">
//               Shop Now
//             </button>
//             <button className="border bg-[#00CED1] text-black border-[#00CED1] hover:border-white px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase hover:bg-white transition">
//               Book Appointment
//             </button>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { User, Calendar, Search, MapPin, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function HeaderWithVideo() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const closeMenu = () => setActiveMenu(null);
  const closeTimerRef = useRef(null);

  const openMenu = (menu) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setActiveMenu(menu);
  };

  const closeMenuWithDelay = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 1000); // 👉 1.5 sec delay (chaaho to 2000)
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* SCROLL NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md text-black transition-all duration-500 ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        {/* TOP ROW */}
        <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-3 sm:py-4">
          {/* LEFT ICONS */}
          <div className="flex gap-3 sm:gap-4">
            <Search size={16} className="sm:size-[18px] cursor-pointer" />
            <MapPin size={16} className="sm:size-[18px] cursor-pointer" />
            <div className=" ml-14 flex items-center justify-between px-4 mt-[18px] md:hidden absolute top-0 left-0 w-full z-20 text-black">
              <Menu
                className="cursor-pointer mt-2"
                size={16}
                onClick={() => setMobileMenuOpen(true)}
              />

              <div />
            </div>
          </div>

          {/* LOGO / TITLE */}
          <h2
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-center whitespace-nowrap"
            style={{ fontFamily: "var(--font-heading--family)" }}
          >
            LA VIE JUMERIAH
          </h2>

          {/* RIGHT ICONS */}
          <div className="flex gap-3 sm:gap-4">
            <User size={16} className="sm:size-[18px] cursor-pointer" />
            <Calendar size={16} className="sm:size-[18px] cursor-pointer" />
          </div>
        </div>

        {/* NAV LINKS */}
        <nav
          className=" hidden md:flex text-black
      ' flex-wrap justify-center
      gap-x-4 gap-y-2
      px-3 pb-3
      text-[10px] sm:text-xs md:text-sm
      uppercase tracking-widest
      text-center
    "
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          <Link to="#" className="text-black">
            Home
          </Link>
          <Link to="#" className="text-black">
            About Us
          </Link>
          {/* ===== SERVICES ===== */}
          <div
            className="relative"
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={closeMenuWithDelay}
          >
            <Link to="#" className="hover:underline text-black">
              Services
            </Link>

            {activeMenu === "services" && (
              <MegaMenu
                type="services"
                onMouseEnter={cancelClose}
                onMouseLeave={closeMenuWithDelay}
              />
            )}
          </div>

          {/* ===== PRODUCTS ===== */}
          <div
            className="relative"
            onMouseEnter={() => openMenu("products")}
            onMouseLeave={closeMenuWithDelay}
          >
            <Link to="#" className="hover:underline text-black">
              Products
            </Link>

            {activeMenu === "products" && (
              <MegaMenu
                type="products"
                onMouseEnter={cancelClose}
                onMouseLeave={closeMenuWithDelay}
              />
            )}
          </div>

          <Link to="contact" className="text-black">
            Contact Us
          </Link>
        </nav>
      </div>

      <header className="relative w-full h-screen overflow-hidden">
        {/* MOBILE HEADER */}
        <div className=" ml-16 flex items-center justify-between px-4 mt-[16px] md:hidden absolute top-0 left-0 w-full z-20 text-white">
          <Menu
            className="cursor-pointer mt-2"
            size={20}
            onClick={() => setMobileMenuOpen(true)}
          />

          <div />
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
        <div className="absolute inset-0 " />

        {/* Content */}
        <div className="relative z-10 text-white h-full flex flex-col">
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
            {/* Left Icons */}
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

            {/* Right Icons */}
            <div className="flex gap-3 sm:gap-4">
              <User size={20} className="cursor-pointer" />
              <Calendar size={20} className="cursor-pointer" />
            </div>
          </div>

          {/* NAVBAR */}
          <nav
            className="hidden md:flex mt-7 md:mt-11 lg:mt-7  flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest px-4 text-center text-white"
            style={{ fontFamily: "var(--font-heading--family)" }}
          >
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="about" className="text-white">
              About Us
            </Link>
            {/* ===== SERVICES ===== */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("services")}
              // onMouseLeave={closeMenuWithDelay}
            >
              <Link to="#" className="hover:underline text-white ">
                Services
              </Link>

              {activeMenu === "services" && (
                <MegaMenu
                  type="services"
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenuWithDelay}
                />
              )}
            </div>

            {/* ===== PRODUCTS ===== */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("products")}
              // onMouseLeave={closeMenuWithDelay}
            >
              <Link to="#" className="hover:underline text-white">
                Products
              </Link>

              {activeMenu === "products" && (
                <MegaMenu
                  type="products"
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenuWithDelay}
                />
              )}
            </div>

            <Link to="contact" className="text-white">
              Contact Us
            </Link>
          </nav>

          {/* BUTTONS */}
          <div
            className="mt-auto mb-16 sm:mb-24 flex flex-col sm:flex-row gap-4 justify-center px-4"
            style={{ fontFamily: "var(--font-heading--family)" }}
          >
            <button className=" bg-[#00CED1] text-black   px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase hover:bg-white transition">
              Shop Now
            </button>
            <button className=" bg-[#00CED1] text-black   px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase hover:bg-white transition">
              Book Appointment
            </button>
          </div>
        </div>
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>
    </>
  );
}
