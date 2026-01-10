import React from "react";

const trustItems = [
  {
    icon: "/gallery/Visible Results.png",
    label1: "Visible",
    label2: "Results",
  },
  {
    icon: "/gallery/Majlis Hospitality.png",
    label1: "Majlis",
    label2: "Hospitality",
  },
  { icon: "/gallery/Royal-Themed.png", label1: "Royal", label2: "Themed" },
  {
    icon: "/gallery/Dubai Luxury 2.png",
    label1: "Dubai",
    label2: "Luxury",
  },
  {
    icon: "/gallery/_Global Rituals.png",
    label1: "Global",
    label2: "Rituals",
  },
];

export default function WhyTrustUs() {
  return (
    <section
      className="py-10 text-white  bg-center bg-cover bg-no-repeat"
      style={{
        // backgroundIma:
        //   "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url('/gallery/treee.jpg')",
        backgroundImage:
          "linear-gradient(135deg, rgba(0,206,209,0.85), rgba(0,206,209,0.6))",
        fontFamily: "var(--font-heading--family)",
      }}
    >
      <h2
        className="text-3xl sm:text-3xl md:text-4xl  text-center mb-10 text-black"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        Why Trust Us?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
        {trustItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.icon}
              alt={item.label1}
              className="w-full h-full mb-3"
            />
            <p className="text-lg leading-tight text-black bg-clip-text">
              {item.label1}
              <br />
              {item.label2}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
