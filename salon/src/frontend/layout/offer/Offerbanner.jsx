// import React, { useEffect, useState } from "react";

// const API_URL =
//   "https://jumeirah.premierwebtechservices.com/backend/api/site/banners/latest";

// export default function Banner() {
//   const [banner, setBanner] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBanner = async () => {
//       try {
//         const res = await fetch(API_URL);
//         const data = await res.json();

//         if (data.success) {
//           setBanner(data.data);
//         }
//       } catch (error) {
//         console.error("Banner fetch failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanner();
//   }, []);

//   if (loading) {
//     return null; // ya loader laga sakti ho
//   }

//   if (!banner?.background_image_url) {
//     return null;
//   }

//   return (
//     <div className="w-full">
//       <img
//         src={banner.background_image_url}
//         alt="Banner"
//         className="w-full h-[350px] md:h-[500px] object-cover"
//       />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

const API_URL =
  "https://jumeirah.premierwebtechservices.com/backend/api/site/banners/latest";

export default function Banner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.success) {
          setBanner(data.data);
        }
      } catch (error) {
        console.error("Banner fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading || !banner?.background_image_url) return null;

  return (
    <div
      className="w-full relative"
      style={{
        // backgroundImage:
        //   "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url('/gallery/bb.jpeg')",
        fontFamily: "var(--font-heading--family)",
      }}
    >
      {/* Banner Image */}
      <img
        src={banner.background_image_url}
        alt="Banner"
        className="w-full h-[350px] md:h-[500px] object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <p className="text-[#00ced1] text-sm md:text-lg font-semibold uppercase tracking-widest mb-2">
          Juma Offer
        </p>

        <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-wide">
          50% OFF ON ALL SERVICES
        </h1>
      </div>
    </div>
  );
}
