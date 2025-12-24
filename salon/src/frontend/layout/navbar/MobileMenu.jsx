import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({ isOpen, onClose }) {
  const [openSub, setOpenSub] = useState(null);

  const toggleSub = (menu) => {
    setOpenSub(openSub === menu ? null : menu);
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* SLIDE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2
            className="text-lg tracking-wide"
            style={{ fontFamily: "var(--font-heading--family)" }}
          >
            MENU
          </h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* NAV ITEMS */}
        <nav className="flex flex-col px-4 py-4 gap-4 uppercase text-sm tracking-widest">
          <Link to="#">Home</Link>
          <Link to="#">About Us</Link>

          {/* SERVICES */}
          <div>
            <button
              onClick={() => toggleSub("services")}
              className="flex justify-between items-center w-full"
            >
              Services
              <ChevronDown
                className={`transition ${
                  openSub === "services" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSub === "services" && (
              <div className="pl-4 mt-2 flex flex-col gap-2 text-xs">
                <Link to="#">Hair</Link>
                <Link to="#">Spa</Link>
                <Link to="#">Makeup</Link>
              </div>
            )}
          </div>

          {/* PRODUCTS */}
          <div>
            <button
              onClick={() => toggleSub("products")}
              className="flex justify-between items-center w-full"
            >
              Products
              <ChevronDown
                className={`transition ${
                  openSub === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSub === "products" && (
              <div className="pl-4 mt-2 flex flex-col gap-2 text-xs">
                <Link to="#">Skin Care</Link>
                <Link to="#">Hair Care</Link>
                <Link to="#">Spa</Link>
                <Link to="#">Nail Extension</Link>
                <Link to="#">Hair Accessories</Link>
                <Link to="#">Gel Nail Extension</Link>
                <Link to="#">Hair Oil</Link>
                <Link to="#">Cosmetics</Link>
              </div>
            )}
          </div>

          <Link to="#">Contact Us</Link>
        </nav>
      </div>
    </>
  );
}
