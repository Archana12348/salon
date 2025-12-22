import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function LuxuryTestimonials() {
  const reviews = [
    {
      text: "My hair was feeling rough & dry from all the heat styling. I tried a treatment at Glamr and the difference was amazing. My hair feels healthier, looks shinier, and I'm getting compliments left and right. I’m definitely coming back for regular.",
      name: "JENNIFER TAYLOR",
      role: "MANAGER",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      text: "My hair was feeling rough & dry from all the heat styling. I tried a treatment at Glamr and the difference was amazing. My hair feels healthier, looks shinier, and I'm getting compliments left and right. I’m definitely coming back for regular.",
      name: "JENNIFER TAYLOR",
      role: "MANAGER",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      text: "My hair was feeling rough & dry from all the heat styling. I tried a treatment at Glamr and the difference was amazing. My hair feels healthier, looks shinier, and I'm getting compliments left and right. I’m definitely coming back for regular.",
      name: "JENNIFER TAYLOR",
      role: "MANAGER",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <div
      className="py-14 sm:py-20  px-4 sm:px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url('/whychoose/bgchoose.jpeg')",
        fontFamily: "var(--font-heading--family)",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-14 text-black bg-clip-text">
        <p className="text-xs sm:text-sm tracking-[3px] ">OUR CLIENTS</p>
        <h2 className="text-2xl sm:text-4xl  tracking-wide mt-2">
          LOVE LETTERS
        </h2>
      </div>

      {/* Two-tone Background */}
      <div className="relative mx-auto max-w-6xl w-full ">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-white"></div>
          <div className="bg-[#00CED1]"></div>
        </div>

        {/* Swiper Section */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          className="relative py-10 sm:py-20 px-4 sm:px-10"
        >
          {reviews.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="relative z-10 text-center py-9 max-w-3xl mx-auto px-2 sm:px-4">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="text-[#d4af37] text-2xl sm:text-2xl"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-black text-sm sm:text-lg leading-relaxed">
                  “{item.text}”
                </p>

                {/* User */}
                <div className="mt-6 sm:mt-10 flex flex-col items-center">
                  <img
                    src={item.image}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-400"
                  />
                  <h3 className="mt-3 text-black sm:mt-4 text-base sm:text-lg font-semibold tracking-widest">
                    {item.name}
                  </h3>
                  <p className="text-black text-xs sm:text-sm tracking-[2px]">
                    {item.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
      </div>
    </div>
  );
}
