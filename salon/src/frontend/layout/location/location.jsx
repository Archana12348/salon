import React from "react";
import { Link } from "react-router-dom";

// Placeholder images - Replace these with your actual imports or URLs
const wilshireImage = "/gallery/location2.avif";
const westwoodImage = "/gallery/location2.avif";

export default function LocationsSection() {
  const LocationCard = ({ image, title, address, estDate }) => (
    <div
      className="flex flex-col items-center max-w-lg mx-auto"
      style={{ fontFamily: "var(--font-heading--family)" }}
    >
      {/* Image */}
      <div className="w-full h-64 md:h-80 overflow-hidden mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Title: Centered text */}
      <h3 className="text-2xl text-center md:text-3xl   mb-3">{title}</h3>

      {/* Address: Centered text */}
      <p className=" text-sm md:text-base mb-2 font-light">{address}</p>

      {/* Footer: Flex container centered horizontally */}
      <div className="w-full flex justify-center items-center gap-2  text-sm md:text-base font-light">
        <span>{estDate}</span>
        <span className="text-gray-300">|</span>
        <Link to="#" className="underline hover:text-black transition-colors">
          Learn More
        </Link>
        <span className="text-gray-300">|</span>
        <Link to="#" className="underline hover:text-black transition-colors">
          Book Now
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full  py-16 px-4">
      <div
        className="max-w-7xl mx-auto text-center text-black bg-clip-text"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        {/* Top Label */}
        <p
          className="text-xs  tracking-[0.2em] uppercase  mb-2"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          Our Locations
        </p>

        {/* Main Title */}
        <h2
          className="text-3xl sm:text-3xl md:text-4xl  text-center mb-10 text-black"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          Welcome to Reine
        </h2>

        {/* Location Cards Container */}
        <div
          className="flex flex-col md:flex-row justify-center items-start gap-y-12 md:gap-x-12"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          {/* Wilshire Location */}
          <LocationCard
            image={wilshireImage}
            title="India Office"
            address="Address: Lavie Jumeirah PPR Market,Shop No. A1 Mithapur Road"
            estDate="Jalandhar, Punjab"
          />

          {/* Westwood Location */}
          <LocationCard
            image={westwoodImage}
            title="Visit Reine Westwood"
            address="8721 Central Ave, Los Angeles, CA 90036"
            estDate="est. 2018"
          />
        </div>
      </div>
    </div>
  );
}
