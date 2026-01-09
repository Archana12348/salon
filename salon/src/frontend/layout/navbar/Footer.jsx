// import React from "react";
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// export default function FooterPage() {
//   return (
//     <div
//       className="w-full bg-center bg-white bg-cover bg-no-repeat bottom-0 left-0 right-0 z-0
//                  text-black   relative"
//       style={{
//         // backgroundImage: `linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.20)), url('/ky footer banner.jpg')`,
//         fontFamily: "var(--font-heading--family)",
//       }}
//     >
//       {/* Top Section */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center py-20 px-6">
//         {/* Location */}
//         <div className="transition-transform hover:scale-105 duration-300">
//           <h2
//             className="text-2xl font-semibold mb-4
//       text-black bg-clip-text"
//           >
//             Our Location
//           </h2>

//           <p className="font-semibold mt-2 ">India Office</p>
//           <p>📍 Address: Lavie Jumeirah PPR Market,</p>
//           <p>Shop No. A1 Mithapur Road,</p>
//           <p>Jalandhar, Punjab</p>
//         </div>

//         {/* Contact */}
//         <div className="transition-transform hover:scale-105 duration-300">
//           <h2
//             className="text-2xl font-semibold mb-4
//       text-black bg-clip-text"
//           >
//             Get in Touch
//           </h2>

//           <p>Phone: +91 90413 69160</p>
//           <p>kylaviejum@gmail.com</p>

//           <div className="flex items-center justify-center gap-4 mt-4 text-xl">
//             <FaFacebookF
//               className="hover:text-blue-400 transition-colors duration-300 cursor-pointer"
//               size={22}
//             />
//             <FaInstagram
//               className="hover:text-pink-400 transition-colors duration-300 cursor-pointer"
//               size={22}
//             />
//           </div>
//         </div>

//         {/* Working Hours */}
//         <div className="transition-transform hover:scale-105 duration-300">
//           <h2
//             className="text-2xl font-semibold mb-4
//       text-black bg-clip-text"
//           >
//             Working Hours
//           </h2>

//           <p>Regular: 9:00 AM – 9:00 PM</p>
//           <p>Winter: 10:00 AM – 8:00 PM</p>
//         </div>
//       </div>

//       <hr className="border-gray-400" />

//       {/* Social Icons */}
//       <div className="py-10 flex items-center justify-center gap-8 text-2xl">
//         <FaFacebookF
//           className="hover:text-blue-400 transition-colors duration-300 cursor-pointer"
//           size={22}
//         />
//         <FaTwitter
//           className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
//           size={22}
//         />
//         <FaInstagram
//           className="hover:text-pink-400 transition-colors duration-300 cursor-pointer"
//           size={22}
//         />
//         <FaYoutube
//           className="hover:text-red-500 transition-colors duration-300 cursor-pointer"
//           size={22}
//         />
//       </div>

//       {/* Menu */}
//       <div className="flex flex-wrap items-center justify-center gap-6 text-sm tracking-widest mb-8 px-4">
//         {["ABOUT", "SERVICES", "TEAM", "GALLERY", "BLOG", "CONTACT"].map(
//           (item) => (
//             <a
//               key={item}
//               href="#"
//               className="hover:text-white hover:underline transition duration-300"
//             >
//               {item}
//             </a>
//           )
//         )}
//       </div>

//       {/* Footer Bottom */}
//       <p className="text-center text-sm pb-10">
//         Copyright 2025 Powered By KY. All right reserved
//       </p>
//     </div>
//   );
// }

import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FooterPage() {
  return (
    <div
      className="w-full bg-center  bg-cover bg-no-repeat bottom-0 left-0 right-0 z-0 
                 text-white   relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.20)), url('/gallery/ky footer banner.jpg')`,
        fontFamily: "var(--font-heading--family)",
      }}
    >
      {/* Top Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center py-20 px-6">
        {/* Location */}
        <div className="transition-transform hover:scale-105 duration-300">
          <h2
            className="text-2xl font-semibold mb-4 
            text-white bg-clip-text"
          >
            Our Location
          </h2>

          <p className="font-semibold mt-2 -mb-0 ">India Office</p>
          <p className="-mb-0">📍 Address: Lavie Jumeirah PPR Market,</p>
          <p className="-mb-0">Shop No. A1 Mithapur Road,</p>
          <p>Jalandhar, Punjab</p>
        </div>

        {/* Contact */}
        <div className="transition-transform hover:scale-105 duration-300">
          <h2
            className="text-2xl font-semibold mb-4 
           text-white bg-clip-text"
          >
            Get in Touch
          </h2>

          <p className="-mb-0">Phone: +91 90413 69160</p>
          <p>kylaviejum@gmail.com</p>

          <div className="flex items-center justify-center gap-4 mt-4 text-xl">
            <a
              href="https://www.facebook.com/people/La-Vie-Jumeirah-Maison-de-Beaut%C3%A9-by-KY/61584077280090/?rdid=m7grFEeEiTAfMcEb&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AftmmtQw4%2F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                className="hover:text-blue-400 transition-colors duration-300 cursor-pointer text-white"
                size={22}
              />
            </a>
            <a
              href="https://www.instagram.com/laviejumeirah/?igsh=eno5Y2o1ajY2NWZq#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="hover:text-pink-400 transition-colors duration-300 cursor-pointer text-white"
                size={22}
              />
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div className="transition-transform hover:scale-105 duration-300">
          <h2
            className="text-2xl font-semibold mb-4 
           text-white bg-clip-text"
          >
            Working Hours
          </h2>

          <p className="-mb-0">Regular: 9:00 AM – 9:00 PM</p>
          <p>Winter: 10:00 AM – 8:00 PM</p>
        </div>
      </div>

      <hr className="border-gray-300 w-40 sm:w-72 md:w-[960px] mx-auto my-8" />

      {/* Social Icons */}
      <div className="py-10 flex items-center justify-center gap-8 text-2xl">
        <a
          href="https://www.facebook.com/people/La-Vie-Jumeirah-Maison-de-Beaut%C3%A9-by-KY/61584077280090/?rdid=m7grFEeEiTAfMcEb&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AftmmtQw4%2F"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <FaFacebookF
            size={22}
            className="text-white transition-colors duration-300 group-hover:text-blue-400 cursor-pointer"
          />
        </a>

        <FaTwitter
          className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
          size={22}
        />
        <a
          href="https://www.instagram.com/laviejumeirah/?igsh=eno5Y2o1ajY2NWZq#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            className="hover:text-pink-400 transition-colors duration-300 cursor-pointer text-white"
            size={22}
          />
        </a>
        <FaYoutube
          className="hover:text-red-500 transition-colors duration-300 cursor-pointer"
          size={22}
        />
      </div>

      {/* Menu */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm tracking-widest mb-8 px-4 ">
        {["ABOUT", "SERVICES", "TEAM", "GALLERY", "BLOG", "CONTACT"].map(
          (item) => (
            <Link
              key={item}
              to="#"
              className="text-white hover:underline transition duration-300"
            >
              {item}
            </Link>
          )
        )}
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-sm pb-10">
        Copyright 2025 Powered By KY. All right reserved
      </p>
    </div>
  );
}
