// import React from "react";
// import { Link } from "react-router-dom";

// // Placeholder images - Replace these with your actual imports or URLs
// const wilshireImage = "/gallery/location2.avif";
// const westwoodImage = "/gallery/location2.avif";

// export default function LocationsSection() {
//   const LocationCard = ({ image, title, address, estDate }) => (
//     <div
//       className="flex flex-col items-center max-w-lg mx-auto"
//       style={{ fontFamily: "var(--font-heading--family)" }}
//     >
//       {/* Image */}
//       <div className="w-full h-64 md:h-80 overflow-hidden mb-6">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
//         />
//       </div>

//       {/* Title: Centered text */}
//       <h3 className="text-2xl text-center md:text-3xl   mb-3">{title}</h3>

//       {/* Address: Centered text */}
//       <p className=" text-sm md:text-base mb-2 font-light">{address}</p>

//       {/* Footer: Flex container centered horizontally */}
//       <div className="w-full flex justify-center items-center gap-2  text-sm md:text-base font-light">
//         <span>{estDate}</span>
//         <span className="text-gray-300">|</span>
//         <Link to="#" className="underline hover:text-black transition-colors">
//           Learn More
//         </Link>
//         <span className="text-gray-300">|</span>
//         <Link to="#" className="underline hover:text-black transition-colors">
//           Book Now
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full  py-16 px-4">
//       <div
//         className="max-w-7xl mx-auto text-center text-black bg-clip-text"
//         style={{ fontFamily: "var(--font-heading--family)" }}
//       >
//         {/* Top Label */}
//         <p
//           className="text-xs  tracking-[0.2em] uppercase  mb-2"
//           style={{ fontFamily: "var(--font-heading--family)" }}
//         >
//           Our Locations
//         </p>

//         {/* Main Title */}
//         <h2
//           className="text-3xl sm:text-3xl md:text-4xl  text-center mb-10 text-black"
//           style={{ fontFamily: "var(--font-heading--family)" }}
//         >
//           Welcome to Reine
//         </h2>

//         {/* Location Cards Container */}
//         <div
//           className="flex flex-col md:flex-row justify-center items-start gap-y-12 md:gap-x-12"
//           style={{ fontFamily: "var(--font-heading--family)" }}
//         >
//           {/* Wilshire Location */}
//           <LocationCard
//             image={wilshireImage}
//             title="India Office"
//             address="Address: Lavie Jumeirah PPR Market,Shop No. A1 Mithapur Road"
//             estDate="Jalandhar, Punjab"
//           />

//           {/* Westwood Location */}
//           <LocationCard
//             image={westwoodImage}
//             title="Visit Reine Westwood"
//             address="8721 Central Ave, Los Angeles, CA 90036"
//             estDate="est. 2018"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

const locations = [
  {
    image: "/gallery/lov4.jpeg",
    title: "India Office",
    address:
      "Lavie Jumeirah PPR Market, Shop No. A1, Mithapur Road, Jalandhar, Punjab",
  },
  {
    image: "/gallery/coming.avif",
    title: "Another Office",
    address: "Coming Soon ",
  },
];

export default function LocationsSection() {
  return (
    <section
      className="w-full py-12 px-4 font-[var(--font-heading--family)]"
      style={{
        // backgroundImage:
        //   "linear-gradient(to bottom, rgba(0,206,209,0.85), rgba(255,255,255,0.95))",
        fontFamily: "var(--font-heading--family)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          className="text-3xl sm:text-3xl md:text-4xl text-center mb-10 text-black"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          Our Locations
        </h2>

        {/* Locations */}
        <div className="">
          {locations.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              {/* IMAGE */}
              <div
                className={`${index % 2 !== 0 ? "md:order-2" : "md:order-1"}`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[320px] object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`
    flex flex-col gap-3
    text-center
    md:space-x-4 md:gap-0
    ${
      index % 2 !== 0
        ? "md:order-1 md:text-right md:items-end"
        : "md:order-2 md:text-left md:items-start"
    }
  `}
              >
                <h3 className="text-3xl ml-3 font-semibold text-black">
                  {" "}
                  {item.title}{" "}
                </h3>

                <p className="text-md text-gray-600 leading-6 ">
                  {" "}
                  {item.address}{" "}
                </p>

                <div
                  className={`
                  flex flex-wrap gap-6 -mt-5 mb-3 md:mb-0 md:mt-0
                  justify-center
                  ${index % 2 !== 0 ? "md:justify-end" : "md:justify-start"}
                 `}
                >
                  <Link
                    to="#"
                    className="text-md uppercase tracking-wider text-[#00CED1] font-semibold hover:underline"
                  >
                    Learn More
                  </Link>

                  <Link
                    to="#"
                    className="text-md uppercase tracking-wider font-semibold hover:text-[#00CED1]"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
