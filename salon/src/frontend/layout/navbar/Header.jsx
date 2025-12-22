import { User, Calendar, Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderWithVideo() {
  return (
    <header className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/bg/salonbg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

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
          className=" mt-7 md:mt-11 lg:mt-7 flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest px-4 text-center"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          <Link to="#" className="hover:underline">
            Home
          </Link>
          <Link to="#" className="hover:underline">
            Services
          </Link>
          <Link to="#" className="hover:underline">
            About Us
          </Link>
          <Link to="#" className="hover:underline">
            Products
          </Link>
          <Link to="#" className="hover:underline">
            Contact Us
          </Link>
        </nav>

        {/* BUTTONS */}
        <div
          className="mt-auto mb-16 sm:mb-24 flex flex-col sm:flex-row gap-4 justify-center px-4"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          <button className="border bg-[#00CED1] text-black border-[#00CED1] hover:border-white px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase hover:bg-white transition">
            Shop Now
          </button>
          <button className="border bg-[#00CED1] text-black border-[#00CED1] hover:border-white px-6 sm:px-8 py-3 text-xs sm:text-sm uppercase hover:bg-white transition">
            Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
}
