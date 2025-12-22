import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const deals = [
  {
    id: 1,
    title: "Fresh Vegetables",
    img: "/hero/hero_2_1.png",
    desc: "Get fresh and organic vegetables with amazing discounts.",
  },
  {
    id: 2,
    title: "Seasonal Fruits",
    img: "/hero/hero_2_3.png",
    desc: "Sweet and juicy fruits for your healthy lifestyle.",
  },
  {
    id: 3,
    title: "Spices & Herbs",
    img: "/hero/hero_1_3.png",
    desc: "Add aroma and flavor to your meals with premium spices.",
  },
  {
    id: 4,
    title: "Grocery Combos",
    img: "/service/service_card_3.jpg",
    desc: "Get combo packs and save more this week!",
  },
  {
    id: 5,
    title: "Daily Essentials",
    img: "/gallery/gallery_2_2.jpg",
    desc: "Everything you need for your kitchen in one place!",
  },
];

const WeeklyDeals = () => {
  const sectionStyle = {
    backgroundImage:
      'url("/hero/hero_shape_1_4.svg"), url("/shape/vector_shape_12.png"),url("/hero/hero_arrow.svg")',
    backgroundPosition: "top left, center, top right",
    backgroundSize: "auto 100%, auto, auto 10%",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section
      className="py-16 px-4 relative bg-green-100 overflow-hidden"
      style={sectionStyle}
    >
      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-green-800 mb-4"
        >
          Weekly Deals
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-700 mb-10"
        >
          Don’t miss out on our special weekly discounts and combo offers!
        </motion.p>

        {/* Slider Section */}
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {deals.map((deal, index) => (
            <SwiperSlide key={deal.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col"
              >
                {/* Image hover lift */}
                <motion.img
                  src={deal.img}
                  alt={deal.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />

                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {deal.title}
                </h3>
                <p className="text-gray-500 mb-4">{deal.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto bg-green-600 hover:bg-[#FF9C00] text-white font-semibold py-2 rounded-lg transition"
                >
                  Shop Now
                </motion.button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default WeeklyDeals;
