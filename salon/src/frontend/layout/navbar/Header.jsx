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

            <div
              className="relative"
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={closeMenuWithDelay}
            >
              <span className="cursor-pointer">Services</span>
              {activeMenu === "services" && (
                <MegaMenu
                  categories={categories}
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenuWithDelay}
                />
              )}
            </div>

            <Link to="/products">Products</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>
      )}

      {/* ================= HOME VIDEO HEADER ================= */}
      {isHomePage && (
        <header className="relative w-full h-screen overflow-hidden">
          <div className="md:hidden absolute top-4 left-4 z-20 text-white">
            <Menu size={22} onClick={() => setMobileMenuOpen(true)} />
          </div>

          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/gallery/videobg.mp4"
            autoPlay
            muted
            loop
          />

          <div className="relative z-10 text-white h-full flex flex-col">
            <div className="flex justify-between px-6 py-6">
              <div className="flex gap-4">
                <Search size={20} />
                <MapPin size={20} />
              </div>

              <h1 className="text-4xl font-bold absolute left-1/2 -translate-x-1/2">
                LA VIE JUMERIAH
              </h1>

              <div className="flex gap-4">
                <User size={20} />
                <Calendar size={20} />
              </div>
            </div>

            <nav className="hidden md:flex justify-center gap-6 mt-8 uppercase">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>

              <div
                className="relative"
                onMouseEnter={() => openMenu("services")}
              >
                <span className="cursor-pointer">Services</span>
                {activeMenu === "services" && (
                  <MegaMenu
                    categories={categories}
                    onMouseEnter={cancelClose}
                    onMouseLeave={closeMenuWithDelay}
                  />
                )}
              </div>

              <Link to="/products">Products</Link>
              <Link to="/contact">Contact Us</Link>
            </nav>

            <div className="mt-auto mb-20 flex gap-6 justify-center">
              <button className="px-10 py-3 rounded-full bg-cyan-400 text-white">
                Shop Now
              </button>
              <button className="px-10 py-3 rounded-full bg-cyan-400 text-white">
                Book Appointment
              </button>
            </div>
          </div>

          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            categories={categories}
          />
        </header>
      )}
    </>
  );
}
