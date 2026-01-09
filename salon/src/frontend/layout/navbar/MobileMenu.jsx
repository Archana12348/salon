import { X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({ isOpen, onClose }) {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* MENU PANEL */}
      <div
        className="
          absolute top-0 left-0
          h-full w-[85vw] max-w-sm
          bg-white text-black
          shadow-2xl
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2
            className="text-lg tracking-widest"
            style={{ fontFamily: "var(--font-heading--family)" }}
          >
            MENU
          </h2>
          <X size={22} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* MENU ITEMS */}
        <nav
          className="
            flex-1 overflow-y-auto
            px-5 py-4
            space-y-4
            text-sm uppercase tracking-widest
          "
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          <Link to="/" onClick={onClose} className="block">
            Home
          </Link>

          <Link to="/about" onClick={onClose} className="block">
            About Us
          </Link>

          {/* SERVICES */}
          <div>
            <button
              onClick={() => toggleSubMenu("services")}
              className="flex w-full items-center justify-between"
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openSubMenu === "services" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSubMenu === "services" && (
              <div className="mt-3 ml-3 space-y-2 text-xs">
                <Link to="/services/hair" onClick={onClose} className="block">
                  Hair
                </Link>
                <Link to="/services/skin" onClick={onClose} className="block">
                  Skin
                </Link>
                <Link to="/services/makeup" onClick={onClose} className="block">
                  Makeup
                </Link>
                <Link to="/services/spa" onClick={onClose} className="block">
                  Spa
                </Link>
              </div>
            )}
          </div>

          {/* PRODUCTS */}
          <div>
            <button
              onClick={() => toggleSubMenu("products")}
              className="flex w-full items-center justify-between"
            >
              <span>Products</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openSubMenu === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSubMenu === "products" && (
              <div className="mt-3 ml-3 space-y-2 text-xs">
                <Link
                  to="/products/hair-care"
                  onClick={onClose}
                  className="block"
                >
                  Hair Care
                </Link>
                <Link
                  to="/products/skin-care"
                  onClick={onClose}
                  className="block"
                >
                  Skin Care
                </Link>
                <Link to="/products/makeup" onClick={onClose} className="block">
                  Makeup
                </Link>
              </div>
            )}
          </div>

          <Link to="/contact" onClick={onClose} className="block">
            Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
}
