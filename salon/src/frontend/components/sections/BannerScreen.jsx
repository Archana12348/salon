// import React from "react";

// // === IMPORTANT ===
// // REPLACE THIS with the path to your wide banner image in the 'public' folder.
// // This image should have the green bg, smoke, and products all in one.
// const bannerImageUrl = "/blog/blog_1_1.jpg";

// const PaanBanner = () => {
//   const bannerStyle = {
//     backgroundImage: `url('${bannerImageUrl}')`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   };

//   return (
//     // 1. The main section is 'w-full' for the full-bleed effect.
//     // It has a set height that changes responsively.
//     <section className="w-full h-64 md:h-72 lg:h-80 mb-8" style={bannerStyle}>
//       {/* 2. A 'container' div keeps the text content aligned
//              with the rest of your site's layout. */}
//       <div className="container mx-auto px-4 h-full">
//         {/* 3. This flex container positions your content */}
//         <div className="relative z-10 h-full flex flex-col justify-center items-start">
//           {/* Text Content */}
//           <h2
//             className="text-6xl md:text-5xl font-bold text-white"
//             // Added a text shadow for better readability on a busy image
//             style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
//           >
//             Paan corner
//           </h2>
//           <p
//             className="text-2xl md:text-4xl text-white mt-2"
//             style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
//           >
//             Your favourite paan shop is now online
//           </p>

//           {/* Button: Styled to match your image */}
//           <a
//             href="/shop-paan" // Change this link to your paan category
//             className="mt-6 px-6 py-2 bg-white text-green-700 font-semibold rounded-lg shadow-md transition-colors hover:bg-gray-100"
//           >
//             Shop Now
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PaanBanner;

import React, { useState, useEffect } from "react";

// Replace with your actual banner image paths (all in /public)
const bannerImages = ["/gallery/project_details.jpg", "/gallery/banner1.jpg"];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Run slider only if more than 1 image
  useEffect(() => {
    if (bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // change every 4 seconds
      return () => clearInterval(interval);
    }
  }, []);

  const bannerStyle = {
    backgroundImage: `url('${bannerImages[currentIndex]}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 1s ease-in-out",
  };

  return (
    <section
      className="w-full h-64 md:h-72 lg:h-80 mb-8 relative"
      style={bannerStyle}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        >
          Paan Corner
        </h2>
        <p
          className="text-lg sm:text-xl md:text-2xl mt-2"
          style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
        >
          Your favourite paan shop is now online
        </p>

        <a
          href="/shop-paan"
          className="mt-6 px-8 py-3 bg-white text-green-700 font-semibold rounded-full shadow-md transition-all hover:bg-green-700 hover:text-white text-lg"
        >
          Shop Now
        </a>
      </div>

      {/* Dots navigation only if multiple images */}
      {bannerImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-white scale-110"
                  : "bg-gray-400 hover:bg-white"
              }`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
