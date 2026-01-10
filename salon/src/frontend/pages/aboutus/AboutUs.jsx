import React, { useEffect, useRef } from "react";

const AboutUs = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden font-[Poppins]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-5 py-24 text-center">
        <h1
          className="text-5xl  mb-6 text-[#e7a509] drop-shadow-[0_0_15px_#956D13]"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          About Our Salon
        </h1>
        <p
          className="text-lg leading-8 mb-5 text-black"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          Welcome to our luxury salon, where beauty meets elegance. We believe
          in enhancing your natural glow with expert care, premium products, and
          a touch of glamour.
        </p>

        <p
          className="text-lg leading-8 text-black"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          From stunning makeovers to relaxing spa experiences, our professional
          team ensures you feel confident, beautiful, and refreshed every time
          you visit us.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
