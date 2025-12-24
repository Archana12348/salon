import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#00CED1] w-full">
      <div
        className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        {/* Left Arrow */}
        <button className="text-black">
          <ChevronLeft size={20} />
        </button>

        {/* Center Text */}
        <p className="text-black text-xs sm:text-sm md:text-base text-center flex-1 px-2">
          Looking for the perfect last-minute makeup? We’re here to help. Call
          Us <span className="font-semibold">(+91 90413 69160)</span>.
        </p>

        {/* Right Arrow */}
        <button className="text-black">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
