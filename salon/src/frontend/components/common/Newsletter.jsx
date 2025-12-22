import React from "react";
import { FiMail } from "react-icons/fi"; // Using Feather Icons for a clean look

const Newsletter = () => {
  return (
    // FIX: Removed 'bg-green-900' to make this section transparent.
    // It will now show the background images from the parent Footer component.
    <div className="text-white py-16">
      <div className="container mx-auto px-4">
        {/* Responsive wrapper: stacks on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side: Icon + Text */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <FiMail className="text-[#FF9C00] w-12 h-12 md:w-12 md:h-12 flex-shrink-0" />
            <h2 className="text-2xl lg:text-2xl font-semibold">
              Sign Up to Get Updates <br /> & News About Us.
            </h2>
          </div>

          {/* Right Side: Form */}
          {/* Responsive form: stacks on small screens, row on medium */}
          <form
            className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()} // Prevents page refresh
          >
            <input
              type="email"
              placeholder="Email Address"
              className="w-full sm:w-[30rem] flex-grow rounded-full border-none  px-8 py-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-[#FF9C00] px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-[#017D03] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-900 text-lg"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* The horizontal line from your screenshot */}
        <hr className="mt-10 border-t border-white/20" />
      </div>
    </div>
  );
};

export default Newsletter;
