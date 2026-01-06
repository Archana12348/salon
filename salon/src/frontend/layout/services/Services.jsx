// import React from "react";

// const services = [
//   { name: "Skin", img: "/gallery/Captureb.PNG" },
//   { name: "Hair", img: "/gallery/Captureh.PNG" },
//   { name: "Makeup", img: "/gallery/Capturem.PNG" },
//   { name: "Heena", img: "/gallery/Capturen.PNG" },
//   { name: "Skin", img: "/gallery/Captureb.PNG" },
// ];

// export default function ServicesSection() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 md:py-9">
//       {/* Section Heading */}
//       <h2
//         className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-black  bg-clip-text"
//         style={{ fontFamily: "Scheherazade New" }}
//       >
//         Our Premium Services
//       </h2>

//       {/* Responsive Grid */}
//       <div
//         className="
//             grid
//             grid-cols-2
//             sm:grid-cols-3
//             md:grid-cols-3
//             lg:grid-cols-5
//             gap-8 sm:gap-10 md:gap-12
//         "
//       >
//         {services.map((item) => (
//           <div
//             key={item.name}
//             className="flex flex-col items-center text-center "
//           >
//             {/* Frame Wrapper Responsive */}
//             <div
//               className="
//                   relative
//                   w-[150px] h-[200px]
//                   sm:w-[180px] sm:h-[180px]
//                   md:w-[250px] md:h-[300px]
//                   lg:w-[250px] lg:h-[320px]
//                   flex items-center justify-center
//                 "
//             >
//               {/* FRAME */}
//               {/* <img
//                 src="/service/frame.png"
//                 alt="frame"
//                 className="absolute inset-0 w-full h-full object-cover"
//               /> */}

//               {/* SERVICE IMAGE (always same ratio) */}
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="
//                     relative

//                     object-contain
//                   "
//               />
//             </div>

//             {/* Name */}
//             <p
//               className="mt-4 sm:mt-5 text-lg sm:text-base md:text-xl  text-black bg-clip-text "
//               style={{ fontFamily: "var(--font-heading--family)" }}
//             >
//               {item.name}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const services = [
  { name: "Makeup", img: "/gallery/Captureb.PNG" },
  { name: "Hair", img: "/gallery/Captureh.PNG" },
  { name: "Heena", img: "/gallery/Capturem.PNG" },
  { name: "Nails", img: "/gallery/Capturen.PNG" },
  { name: "Makeup", img: "/gallery/Captureb.PNG" },
];

export default function ServicesSection() {
  return (
    <div className="max-w-7xl mx-auto py-7 sm:px-6 md:py-12">
      {/* Heading */}
      <h2
        className="text-3xl sm:text-3xl md:text-4xl  text-center mb-10 text-black"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        Our Premium Services
      </h2>

      {/* Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {services.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center group">
              {/* Image Box */}
              <div className="relative  flex items-center justify-cente overflow-hidde shadow-lg transition-transform duration-500 group-hover:scale-105 ">
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Name */}
              <p
                className="mt-4 text-lg md:text-xl text-black"
                style={{ fontFamily: "var(--font-heading--family)" }}
              >
                {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
