import { X, ChevronDown, User, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({
  isOpen,
  onClose,
  name,
  slug,
  categories = [],
}) {
  const [openMenu, setOpenMenu] = useState(null); // services / products
  const [openCategory, setOpenCategory] = useState(null); // category id

  /* 🔒 Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenCategory(null);
  };

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* MENU PANEL */}
      <div className="absolute top-0 left-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col">
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
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-sm uppercase tracking-widest"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          <Link to="/" onClick={onClose} className="block">
            Home
          </Link>

          <Link to="/about" onClick={onClose} className="block">
            About Us
          </Link>

          {/* ================= SERVICES (API) ================= */}
          <div>
            <button
              onClick={() => toggleMenu("services")}
              className="flex w-full items-center justify-between"
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openMenu === "services" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === "services" && (
              <div className="mt-3 ml-3 space-y-3 text-xs normal-case">
                {categories.length === 0 && (
                  <p className="text-gray-400">Loading...</p>
                )}

                {categories.map((cat) => (
                  <div key={cat.id}>
                    {/* CATEGORY ROW */}
                    <div className="flex items-center justify-between py-1">
                      {/* CATEGORY LINK */}
                      <Link
                        to={`/service/${cat.slug}`}
                        onClick={onClose}
                        className="
                        text-sm font-semibold uppercase tracking-wider
                       text-gray-900 hover:text-[#00CED1]
                       "
                      >
                        {cat.name}
                      </Link>

                      {/* TOGGLE SUB CATEGORY */}
                      {cat.sub_categories?.length > 0 && (
                        <button onClick={() => toggleCategory(cat.id)}>
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${
                              openCategory === cat.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* SUB CATEGORIES */}
                    {openCategory === cat.id &&
                      cat.sub_categories?.length > 0 && (
                        <div className="ml-4 mt-2 space-y-2">
                          {cat.sub_categories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/service/${cat.slug}?subcategory=${sub.slug}`}
                              onClick={onClose}
                              className="block text-gray-700 uppercase hover:text-black"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= PRODUCTS ================= */}
          <div>
            <button
              onClick={() => toggleMenu("products")}
              className="flex w-full items-center justify-between"
            >
              <span>Products</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openMenu === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* {openMenu === "products" && (
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
            )} */}
          </div>

          <Link to="/contactUs" onClick={onClose} className="block">
            Contact Us
          </Link>
          {/* <Link
            to="/login"
            onClick={onClose}
            className="flex items-center justify-center gap-2 text-xl bg-[#00CED1] text-white py-2 rounded-full mt-6"
          >
            <User size={20} />
            <span className="text-sm mt-1">Login</span>
          </Link> */}

          <Link
            to="/appointment"
            onClick={onClose}
            className="flex items-center justify-center gap-2 text-xl bg-[#00CED1] text-white py-2 rounded-full mt-2"
          >
            <Calendar size={20} />
            <span className="text-sm mt-1">Book</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
