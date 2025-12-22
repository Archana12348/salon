import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function AboutUsPageImproved() {
  return (
    <div className="w-full font-sans bg-gray-50 text-gray-800">
      {/* ---------------- HERO SECTION ---------------- */}
      {/* <div
        className="w-full h-[320px] md:h-[470px] bg-cover bg-center flex flex-col justify-center items-center text-white relative"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold drop-shadow-lg z-10"
        >
          Do You Want To Know Us?
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 px-7 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white font-medium z-10 shadow-lg"
        >
          Learn More
        </motion.button>
      </div> */}

      {/* ---------------- IMAGE + TEXT SECTION ---------------- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-16 px-5 md:px-10 items-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="/gallery/gallery_1_1.jpg"
          alt="groceries"
          className="rounded-2xl shadow-xl"
        />

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 leading-tight">
            Your Destination for Quality Produce and Pantry Essentials
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Freshness is our promise. From organic produce to daily essentials,
            everything is handpicked and verified to ensure top-notch quality.
          </p>
          <ul className="mt-5 space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" /> Fresh & Organic
              Products
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" /> Quick Delivery Service
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" /> Affordable & Fair
              Pricing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" /> Trusted by Millions
            </li>
          </ul>
        </div>
      </div>

      {/* ---------------- STATS SECTION ---------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto py-12 text-center px-5 border border-green-100 border-separate bg-green-100">
        {[
          { number: "60M+", label: "Happy Customers" },
          { number: "105M+", label: "Orders Delivered" },
          { number: "80K+", label: "Products Available" },
          { number: "80K+", label: "Stores Connected" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 hover:text-[#FF9C00]">
              {item.number}
            </h2>
            <p className="text-gray-600 mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ---------------- TEAM SECTION ---------------- */}
      <div className="bg-white py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700">
          Meet Our Expert Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto mt-12 px-5 md:px-10">
          {[
            {
              img: "/blog/comment-author-1.jpg",
              name: "Samuel Alexander",
              role: "Senior Nutritionist",
            },
            {
              img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress",
              name: "Mia Catherine",
              role: "Quality Control Head",
            },
            {
              img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress",
              name: "William Parker",
              role: "Chief Procurement Officer",
            },
            {
              img: "https://images.pexels.com/photos/1136973/pexels-photo-1136973.jpeg?auto=compress",
              name: "Sophia Amelia",
              role: "Farm Relations Manager",
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center  p-5 rounded-2xl shadow-md hover:shadow-xl transition shadow-green-100"
            >
              <img src={member.img} className="w-full h-full object-cover " />
              <h3 className="font-semibold text-xl mt-8">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------- WHY CHOOSE US SECTION ---------------- */}
      <div className="py-16 bg-gray-100 mt-9">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700">
          Why You Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto gap-10 mt-12 px-5 md:px-10">
          {[
            {
              icon: "✓",
              title: "Organic Food Process",
              text: "Natural produce handled with certified organic standards.",
            },
            {
              icon: "✓",
              title: "Premium Food Services",
              text: "A smooth shopping experience with premium care.",
            },
            {
              icon: "✓",
              title: "Doorstep Delivery",
              text: "Fast, safe and hygienic deliveries at your home.",
            },
            {
              icon: "✓",
              title: "Guaranteed Quality",
              text: "Every item is inspected to ensure the highest standards.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition text-center"
            >
              <div className="w-16 h-16 mx-auto bg-green-100 text-green-700 flex items-center justify-center rounded-full text-3xl font-bold shadow-md">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
