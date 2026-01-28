import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const services = [
  { name: "Makeup", img: "/gallery/Captureb-removebg-preview.png" },
  { name: "Hair", img: "/gallery/Captureh-removebg-preview.png" },
  { name: "Heena", img: "/gallery/Capturem-removebg-preview.png" },
  { name: "Nails", img: "/gallery/Capturen-removebg-preview.png" },
  { name: "Makeup", img: "/gallery/Captureb-removebg-preview.png" },
];

export default function ServicesSection() {
  return (
    <div
      className="w-full py-16 sm:py-20 md:py-12 bg-[#00CED1]"
      style={{
        // backgroundImage:
        //   "linear-gradient(120deg, rgba(0,206,209,0.5), rgba(255,255,255,0.95))",
        fontFamily: "var(--font-heading--family)",
      }}
    >
      <div
        className=""
        style={{
          // backgroundImage:
          //   "linear-gradient(to bottom, rgba(0,206,209,0.85), rgba(255,255,255,0.95))",
          fontFamily: "var(--font-heading--family)",
        }}
      >
        {/* Heading */}
        <h2
          className="text-3xl sm:text-3xl md:text-4xl text-center mb-10 text-black"
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
                <div className="relative  flex items-center justify-cente overflow-hidde transition-transform duration-500 group-hover:scale-105 ">
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
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { useNavigate } from "react-router-dom";

// import "swiper/css";
// import "swiper/css/pagination";

// const API_URL =
//   "https://jumeirah.premierwebtechservices.com/backend/api/site/category";

// const IMAGE_BASE =
//   "https://jumeirah.premierwebtechservices.com/backend/storage/";

// export default function ServicesSection() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(API_URL);

//       // 🔥 ONLY REQUIRED FIELDS
//       const formattedData = (res.data.data || []).map((item) => ({
//         id: item.id,
//         name: item.name,
//         slug: item.slug,
//         photo: item.photo,
//       }));

//       console.log("FINAL CATEGORY DATA:", formattedData);

//       setCategories(formattedData);
//     } catch (error) {
//       console.error(
//         "CATEGORY FETCH ERROR:",
//         error.response?.data || error.message,
//       );
//     }
//   };

//   return (
//     <div
//       className="w-full py-16 sm:py-20 md:py-12 bg-[#00CED1]"
//       style={{ fontFamily: "var(--font-heading--family)" }}
//     >
//       <h2 className="text-3xl md:text-4xl text-center mb-10 text-black">
//         Our Premium Services
//       </h2>

//       <Swiper
//         modules={[Autoplay, Pagination]}
//         spaceBetween={30}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         breakpoints={{
//           0: { slidesPerView: 1 },
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//         }}
//         className="pb-12"
//       >
//         {categories.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div className="flex flex-col items-center text-center group">
//               {/* Image */}
//               <div
//                 className="flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-105"
//                 onClick={() => navigate(`/service/${item.slug}`)}
//               >
//                 <img
//                   src={
//                     item.photo ? `${IMAGE_BASE}${item.photo}` : "/no-image.png"
//                   }
//                   alt={item.name}
//                   className="object-contain w-full h-full"
//                   onError={(e) => (e.target.src = "/no-image.png")}
//                 />
//               </div>

//               {/* Name */}
//               <p className="mt-4 text-lg md:text-xl text-black">{item.name}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
