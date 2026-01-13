<<<<<<< HEAD
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

// import { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { User, Calendar, Search, MapPin, Menu } from "lucide-react";
// import { Link } from "react-router-dom";
// import MegaMenu from "./MegaMenu";
// import MobileMenu from "./MobileMenu";

// export default function HeaderWithVideo() {
//   const [showNavbar, setShowNavbar] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const closeMenu = () => setActiveMenu(null);
//   const closeTimerRef = useRef(null);
//   const location = useLocation();
//   const isHomePage = location.pathname === "/";
//   const openMenu = (menu) => {
//     if (closeTimerRef.current) {
//       clearTimeout(closeTimerRef.current);
//     }
//     setActiveMenu(menu);
//   };

//   const closeMenuWithDelay = () => {
//     closeTimerRef.current = setTimeout(() => {
//       setActiveMenu(null);
//     }, 300); // 👉 1.5 sec delay (chaaho to 2000)
//   };

//   const cancelClose = () => {
//     if (closeTimerRef.current) {
//       clearTimeout(closeTimerRef.current);
//     }
//   };

//   useEffect(() => {
//     if (isHomePage) {
//       window.scrollTo(0, 0); // 👈 scroll top
//       setShowNavbar(false); // 👈 navbar turant hide
//     } else {
//       setShowNavbar(true); // 👈 other pages par fixed
//     }
//   }, [isHomePage]);

//   useEffect(() => {
//     if (!isHomePage) {
//       setShowNavbar(true); // 👉 other pages par navbar FIX rahe
//       return;
//     }

//     const handleScroll = () => {
//       setShowNavbar(window.scrollY > 120);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isHomePage]);

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     if (window.scrollY > 120) {
//   //       setShowNavbar(true);
//   //     } else {
//   //       setShowNavbar(false);
//   //     }
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => window.removeEventListener("scroll", handleScroll);
//   // }, []);

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
//             <div className=" ml-14 flex items-center justify-between px-4 mt-[18px] md:hidden absolute top-0 left-0 w-full z-20 text-black">
//               <Menu
//                 className="cursor-pointer mt-2"
//                 size={20}
//                 onClick={() => setMobileMenuOpen(true)}
//               />

//               <div />
//             </div>
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
//             <Link to="/login">
//               <User
//                 size={16}
//                 className="sm:size-[18px] cursor-pointer text-black"
//               />
//             </Link>

//             <Calendar size={16} className="sm:size-[18px] cursor-pointer" />
//           </div>
//         </div>

//         {/* NAV LINKS */}
//         <nav
//           className=" hidden md:flex text-black
//           ' flex-wrap justify-center
//             gap-x-4 gap-y-2
//             px-3 pb-3
//             text-[10px] sm:text-xs md:text-sm
//             uppercase tracking-widest
//             text-center
//          "
//           style={{ fontFamily: "var(--font-heading--family)" }}
//         >
//           <Link to="/" className="text-black">
//             Home
//           </Link>
//           <Link to="#" className="text-black">
//             About Us
//           </Link>
//           {/* ===== SERVICES ===== */}
//           <div
//             className="relative"
//             onMouseEnter={() => openMenu("services")}
//             onMouseLeave={closeMenuWithDelay}
//           >
//             <Link to="#" className="hover:underline text-black">
//               Services
//             </Link>

//             {activeMenu === "services" && (
//               <MegaMenu
//                 type="services"
//                 onMouseEnter={cancelClose}
//                 onMouseLeave={closeMenuWithDelay}
//               />
//             )}
//           </div>

//           {/* ===== PRODUCTS ===== */}
//           <div
//             className="relative"
//             onMouseEnter={() => openMenu("products")}
//             onMouseLeave={closeMenuWithDelay}
//           >
//             <Link to="#" className="hover:underline text-black">
//               Products
//             </Link>

//             {/* {activeMenu === "products" && (
//               <MegaMenu
//                 type="products"
//                 onMouseEnter={cancelClose}
//                 onMouseLeave={closeMenuWithDelay}
//               />.
//             )} */}
//           </div>

//           <Link to="service/:slug" className="text-black">
//             Contact Us
//           </Link>
//         </nav>
//       </div>
//       {isHomePage && (
//         <header className="relative w-full h-screen overflow-hidden">
//           {/* MOBILE HEADER */}
//           <div className=" ml-16 flex items-center justify-between px-4 mt-[16px] md:hidden absolute top-0 left-0 w-full z-20 text-white">
//             <Menu
//               className="cursor-pointer mt-2"
//               size={20}
//               onClick={() => setMobileMenuOpen(true)}
//             />

//             <div />
//           </div>
//           {/* Background Video */}
//           <video
//             className="absolute top-0 left-0 w-full h-full object-cover"
//             src="/gallery/videobg.mp4"
//             autoPlay
//             muted
//             loop
//             playsInline
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0 " />

//           {/* Content */}
//           <div className="relative z-10 text-white h-full flex flex-col">
//             {/* TOP BAR */}
//             <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
//               {/* Left Icons */}
//               <div className="flex gap-3 sm:gap-4">
//                 <Search size={20} className="cursor-pointer" />
//                 <MapPin size={20} className="cursor-pointer" />
//               </div>

//               {/* Center Title */}
//               <h1
//                 className="absolute left-1/2 -translate-x-1/2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-center mt-4 md:mt-11 lg:mt-4"
//                 style={{ fontFamily: "var(--font-heading--family)" }}
//               >
//                 LA VIE JUMERIAH
//               </h1>

//               {/* Right Icons */}
//               <div className="flex gap-3 sm:gap-4">
//                 <Link to="/login">
//                   <User size={20} className="cursor-pointer text-white" />
//                 </Link>
//                 <Calendar size={20} className="cursor-pointer" />
//               </div>
//             </div>

//             {/* NAVBAR */}
//             <nav
//               className="hidden md:flex mt-7 md:mt-11 lg:mt-7  flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest px-4 text-center text-white"
//               style={{ fontFamily: "var(--font-heading--family)" }}
//             >
//               <Link to="/" className="text-white">
//                 Home
//               </Link>
//               <Link to="about" className="text-white">
//                 About Us
//               </Link>
//               {/* ===== SERVICES ===== */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => openMenu("services")}
//                 // onMouseLeave={closeMenuWithDelay}
//               >
//                 <Link to="#" className="hover:underline text-white ">
//                   Services
//                 </Link>

//                 {activeMenu === "services" && (
//                   <MegaMenu
//                     type="services"
//                     onMouseEnter={cancelClose}
//                     onMouseLeave={closeMenuWithDelay}
//                   />
//                 )}
//               </div>

//               {/* ===== PRODUCTS ===== */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => openMenu("products")}
//                 // onMouseLeave={closeMenuWithDelay}
//               >
//                 <Link to="#" className="hover:underline text-white">
//                   Products
//                 </Link>

//                 {/* {activeMenu === "products" && (
//                   // <MegaMenu
//                   //   type="products"
//                   //   onMouseEnter={cancelClose}
//                   //   onMouseLeave={closeMenuWithDelay}
//                   // />
//                 )} */}
//               </div>

//               <Link to="contact" className="text-white">
//                 Contact Us
//               </Link>
//             </nav>

//             {/* BUTTONS */}
//             <div
//               className="mt-auto mb-16 sm:mb-24 flex flex-col sm:flex-row gap-6 justify-center px-4"
//               style={{ fontFamily: "var(--font-heading--family)" }}
//             >
//               {/* Shop Now */}
//               <button
//                 className="
//                  relative overflow-hidden
//                  px-8 sm:px-10 py-3
//                  text-xs sm:text-sm uppercase tracking-wider font-semibold
//                  rounded-full
//                  bg-gradient-to-r from-[#00CED1] via-[#20B2AA] to-[#00CED1]
//                text-black
//                  shadow-[0_0_20px_rgba(0,206,209,0.5)]
//                  transition-all duration-300
//                  hover:scale-105 hover:shadow-[0_0_35px_rgba(0,206,209,0.9)]
//                  "
//               >
//                 <span className="relative z-10">Shop Now</span>
//                 <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition" />
//               </button>

//               {/* Book Appointment */}
//               <button
//                 className="
//                relative overflow-hidden
//                px-8 sm:px-10 py-3
//                text-xs sm:text-sm uppercase tracking-wider font-semibold
//                rounded-full
//                border border-[#00CED1]
//               text-[#00CED1]
//                bg-transparent
//                shadow-[0_0_15px_rgba(0,206,209,0.4)]
//                transition-all duration-300
//                hover:bg-[#00CED1] hover:text-white
//               hover:scale-105 hover:shadow-[0_0_35px_rgba(0,206,209,0.9)]
//               "
//               >
//                 Book Appointment
//               </button>
//             </div>
//           </div>
//           <MobileMenu
//             isOpen={mobileMenuOpen}
//             onClose={() => setMobileMenuOpen(false)}
//           />
//         </header>
//       )}
//     </>
//   );
// }

=======
>>>>>>> sachin
import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { User, Calendar, Search, MapPin, Menu } from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function HeaderWithVideo() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [categories, setCategories] = useState([]);

  const closeTimerRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

  return (
    <>
      {/* ================= FIXED NAVBAR ================= */}
      {showNavbar && (
<<<<<<< HEAD
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
              <Link to="/login">
                <User
                  size={16}
                  className="sm:size-[18px] cursor-pointer text-black"
                />
              </Link>

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
            style={{ fontFamily: "var(--font-heading--family)" }}
          >
            <Link to="/" className="text-black">
              Home
            </Link>
            <Link to="#" className="text-black">
              About Us
            </Link>
=======
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex gap-4">
              <Search size={18} />
              <MapPin size={18} />
            </div>

            <h2 className="text-2xl font-semibold">LA VIE JUMERIAH</h2>

            <div className="flex gap-4">
              <Link to="/login">
                <User size={18} />
              </Link>
              <Calendar size={18} />
            </div>
          </div>

          <nav className="hidden md:flex justify-center gap-6 pb-3 uppercase text-sm">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
>>>>>>> sachin

            <div
              className="relative"
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={closeMenuWithDelay}
            >
<<<<<<< HEAD
              <span className="cursor-pointer hover:underline text-black">
                Services
              </span>
=======
              <span className="cursor-pointer">Services</span>
>>>>>>> sachin
              {activeMenu === "services" && (
                <MegaMenu
                  categories={categories}
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenuWithDelay}
                />
              )}
            </div>

<<<<<<< HEAD
            <Link to="/products" className="text-black">
              Products
            </Link>
            <Link to="/contact" className="text-black">
              Contact Us
            </Link>
=======
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact Us</Link>
>>>>>>> sachin
          </nav>
        </div>
      )}

      {/* ================= HOME VIDEO HEADER ================= */}
      {isHomePage && (
        <header className="relative w-full h-screen overflow-hidden">
<<<<<<< HEAD
          <div className=" ml-16 flex items-center justify-between px-4 mt-[16px] md:hidden absolute top-0 left-0 w-full z-20 text-white">
            <Menu
              className="cursor-pointer mt-2"
              size={20}
              onClick={() => setMobileMenuOpen(true)}
            />
=======
          <div className="md:hidden absolute top-4 left-4 z-20 text-white">
            <Menu size={22} onClick={() => setMobileMenuOpen(true)} />
>>>>>>> sachin
          </div>

          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/gallery/videobg.mp4"
            autoPlay
            muted
            loop
          />
<<<<<<< HEAD
          {/* Overlay */}
          {/* <div className="absolute inset-0 " /> */}
          {/* Content */}
          <div className="relative z-10 text-white h-full flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
              <div className="flex gap-3 sm:gap-4">
                <Search size={20} className="cursor-pointer" />
                <MapPin size={20} className="cursor-pointer" />
=======

          <div className="relative z-10 text-white h-full flex flex-col">
            <div className="flex justify-between px-6 py-6">
              <div className="flex gap-4">
                <Search size={20} />
                <MapPin size={20} />
>>>>>>> sachin
              </div>

              <h1 className="text-4xl font-bold absolute left-1/2 -translate-x-1/2">
                LA VIE JUMERIAH
              </h1>

<<<<<<< HEAD
              <div className="flex gap-3 sm:gap-4">
                <Link to="/login">
                  <User size={20} className="cursor-pointer text-white" />
                </Link>
                <Calendar size={20} className="cursor-pointer" />
              </div>
            </div>

            <nav
              className="hidden md:flex mt-7 md:mt-11 lg:mt-7  flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest px-4 text-center text-white"
              style={{ fontFamily: "var(--font-heading--family)" }}
            >
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to="/about" className="text-white">
                About Us
              </Link>
=======
              <div className="flex gap-4">
                <User size={20} />
                <Calendar size={20} />
              </div>
            </div>

            <nav className="hidden md:flex justify-center gap-6 mt-8 uppercase">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
>>>>>>> sachin

              <div
                className="relative"
                onMouseEnter={() => openMenu("services")}
              >
<<<<<<< HEAD
                <span className="cursor-pointer hover:underline text-white">
                  Services
                </span>
=======
                <span className="cursor-pointer">Services</span>
>>>>>>> sachin
                {activeMenu === "services" && (
                  <MegaMenu
                    categories={categories}
                    onMouseEnter={cancelClose}
                    onMouseLeave={closeMenuWithDelay}
                  />
                )}
              </div>

<<<<<<< HEAD
              <Link to="/products" className="hover:underline text-white">
                Products
              </Link>
              <Link to="/contact" className="text-white">
                Contact Us
              </Link>
=======
              <Link to="/products">Products</Link>
              <Link to="/contact">Contact Us</Link>
>>>>>>> sachin
            </nav>

            <div className="mt-auto mb-20 flex gap-6 justify-center">
              <button className="px-10 py-3 rounded-full bg-cyan-400 text-white">
                Shop Now
              </button>
<<<<<<< HEAD
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
              >
=======
              <button className="px-10 py-3 rounded-full bg-cyan-400 text-white">
>>>>>>> sachin
                Book Appointment
              </button>
            </div>
          </div>
<<<<<<< HEAD
=======

          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            categories={categories}
          />
>>>>>>> sachin
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
