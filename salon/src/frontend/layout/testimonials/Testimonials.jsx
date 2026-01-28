import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function LuxuryTestimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/testimonials",
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Testimonials API Data 👉", data); // ✅ console print
        if (data.success) {
          setReviews(data.data);
        }
      })
      .catch((err) => console.error("API Error ❌", err));
  }, []);

  return (
    <div
      className="py-14 sm:py-20 px-4 sm:px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url('/whychoose/bgchoose.jpeg')",
        fontFamily: "var(--font-heading--family)",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-14 text-black">
        <p className="text-xs sm:text-sm tracking-[3px]">OUR CLIENTS</p>
        <h2 className="text-3xl sm:text-3xl md:text-4xl mt-2">LOVE LETTERS</h2>
      </div>

      {/* Two-tone Background */}
      <div className="relative mx-auto max-w-6xl w-full">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-white"></div>
          <div className="bg-[#00CED1]"></div>
        </div>

        {/* Swiper Section */}
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          className="relative py-10 sm:py-20 px-4 sm:px-10"
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative z-10 text-center py-9 max-w-3xl mx-auto px-2 sm:px-4">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-[#d4af37] text-2xl">
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-black text-sm sm:text-lg leading-relaxed">
                  “{item.comment}”
                </p>

                {/* User Info */}
                <div className="mt-6 sm:mt-10 flex flex-col items-center">
                  <img
                    src={item.user?.avatar || "/gallery/user.png"}
                    alt={item.user?.name || "User"}
                    onError={(e) => {
                      e.currentTarget.src = "/gallery/user.png";
                    }}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-400"
                  />

                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg capitalize font-semibold tracking-widest text-black">
                    {item.user?.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

//
