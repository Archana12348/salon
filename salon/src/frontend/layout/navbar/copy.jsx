// import { Link } from "react-router-dom";

// export default function MegaMenu({ type, onMouseEnter, onMouseLeave }) {
//   return (
//     <div
//       className="absolute left-1/2 -translate-x-1/2 top-full mt-3
//       w-[92vw] max-w-6xl bg-white text-black shadow-2xl
//       border border-gray-100 z-[999]"
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       <div className="px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
//         {type === "services" && (
//           <>
//             <MenuBlock
//               title="Hair"
//               items={["Hair Cut", "Hair Spa", "Hair Color"]}
//             />
//             <MenuBlock
//               title="Skin"
//               items={["Facial", "Clean Up", "Glow Therapy"]}
//             />
//             <MenuBlock
//               title="Makeup"
//               items={["Party Makeup", "Bridal Makeup", "Airbrush"]}
//             />
//             <MenuBlock
//               title="Spa"
//               items={["Body Massage", "Aroma Therapy", "Relax Spa"]}
//             />
//           </>
//         )}

//         {type === "products" && (
//           <>
//             <MenuBlock
//               title="Hair Products"
//               items={["Shampoo", "Conditioner", "Serum"]}
//             />
//             <MenuBlock
//               title="Skin Care"
//               items={["Face Wash", "Moisturizer", "Sunscreen"]}
//             />
//             <MenuBlock
//               title="Makeup"
//               items={["Foundation", "Lipstick", "Eyeshadow"]}
//             />
//             <MenuBlock
//               title="Tools"
//               items={["Hair Dryer", "Straightener", "Curler"]}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ===== Reusable Menu Column ===== */
// function MenuBlock({ title, items }) {
//   return (
//     <div>
//       <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide text-gray-800">
//         {title}
//       </h4>
//       <ul className="space-y-3">
//         {items.map((item, index) => (
//           <li key={index}>
//             <Link
//               to="#"
//               className="block transition-colors duration-200 text-black hover:text-[#00CED1]"
//             >
//               {item}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function MegaMenu({ onMouseEnter, onMouseLeave }) {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetch(
//       "https://jumeirah.premierwebtechservices.com/backend/api/site/category"
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("data.ddddd".data);
//         if (data?.success) {
//           console.log(data.dat);
//           setCategories(data.data || []);
//         }
//       })
//       .catch((err) => console.error("Category API error", err));
//   }, []);

//   if (!categories.length) return null;

//   return (
//     <div
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//       className="
//         absolute left-1/2 top-full -translate-x-1/2 mt-2
//         w-[95vw] max-w-7xl
//         bg-white shadow-2xl
//         rounded-xl z-[1000]
//       "
//     >
//       <div
//         className="
//         px-10 py-8
//         grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
//         gap-x-10 gap-y-8
//       "
//       >
//         {categories.map((cat, index) => (
//           <MenuColumn
//             key={cat.id}
//             category={cat}
//             showDivider={index !== categories.length - 1}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ================= COLUMN ================= */

// function MenuColumn({ category }) {
//   const { name, slug, sub_categories } = category;

//   return (
//     <div className="relative">
//       {/* CATEGORY TITLE */}
//       <Link
//         to={`/category/${slug}`}
//         className="
//           block mb-4
//           text-sm font-semibold uppercase tracking-wider
//           text-gray-900 hover:text-[#00CED1]
//         "
//       >
//         {name}
//       </Link>

//       {/* SUB CATEGORIES */}
//       <ul className="space-y-2">
//         {sub_categories?.length > 0 ? (
//           sub_categories.map((sub) => (
//             <li key={sub.id}>
//               <Link
//                 to={`/category/${slug}/${sub.slug}`}
//                 className="
//                   text-sm text-gray-600
//                   transition-colors duration-200
//                   hover:text-[#00CED1]
//                 "
//               >
//                 {sub.name}
//               </Link>
//             </li>
//           ))
//         ) : (
//           <li className="text-xs text-gray-400">Coming soon</li>
//         )}
//       </ul>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* ================= MAIN MEGA MENU ================= */

export default function MegaMenu({ onMouseEnter, onMouseLeave }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/category"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Full API Response:", data);

        if (data?.success && Array.isArray(data.data)) {
          // 🔥 remove null / undefined items
          const cleanCategories = data.data.filter(Boolean);
          setCategories(cleanCategories);
        }
      })
      .catch((err) => console.error("Category API error:", err));
  }, []);

  // Avoid rendering until data exists
  if (!categories.length) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
        absolute left-1/2 top-full -translate-x-1/2 mt-2
        w-[95vw] max-w-7xl
        bg-white shadow-2xl
        rounded-xl z-[1000]
      "
    >
      <div
        className="
          px-10 py-8
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
          gap-x-10 gap-y-8
        "
      >
        {categories.map((cat) => (
          <MenuColumn key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}

/* ================= COLUMN ================= */

function MenuColumn({ category }) {
  if (!category) return null;

  const { name, slug, sub_categories } = category;

  return (
    <div className="relative">
      {/* CATEGORY TITLE */}
      <Link
        to={`/category/${slug}`}
        className="
          block mb-4
          text-sm font-semibold uppercase tracking-wider
          text-gray-900 hover:text-[#00CED1]
        "
      >
        {name}
      </Link>

      {/* SUB CATEGORIES (ALWAYS VISIBLE) */}
      <ul className="space-y-2">
        {Array.isArray(sub_categories) && sub_categories.length > 0 ? (
          sub_categories.map((sub) => (
            <li key={sub.id}>
              <Link
                to={`/category/${slug}/${sub.slug}`}
                className="
                  text-sm text-gray-600
                  hover:text-[#00CED1]
                "
              >
                {sub.name}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-xs text-gray-400">Coming soon</li>
        )}
      </ul>
    </div>
  );
}
