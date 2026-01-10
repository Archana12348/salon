// import React from "react";

// const CustomerPreview = ({
//   data,
//   onConfirm,
//   onBack,
//   categories,
//   subCategories,
//   services,
// }) => {
//   console.log(data,categories, subCategories, services);
//   debugger;
//   if (!data) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//       <div className="bg-white w-[500px] p-8 rounded-2xl shadow-2xl animate-fadeIn relative">
//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onBack}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//         >
//           ✖
//         </button>

//         {/* HEADING */}
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Enter Customer Details
//         </h2>

//         {/* CUSTOMER DETAIL PREVIEW */}
//         <div className="space-y-5">
//           <div>
//             <label className="font-semibold text-gray-700">Full Name</label>
//             <input
//               disabled
//               value={data?.name || ""}
//               className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="font-semibold text-gray-700">Phone Number</label>
//             <input
//               disabled
//               value={data?.phone || ""}
//               className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="font-semibold text-gray-700">Email</label>
//             <input
//               disabled
//               value={data?.email || ""}
//               className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="font-semibold text-gray-700">Category Name</label>
//             <input
//               disabled
//               value={categories?.name || " "}
//               className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="font-semibold text-gray-700">
//               SubCategory Name
//             </label>
//             <input
//               disabled
//               value={subCategories?.name || " "}
//               className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="font-semibold text-gray-700">Service Name</label>
//             <input
//               disabled
//               value={services?.name || {}}
//               className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex gap-4 mt-7">
//           <button
//             onClick={onBack}
//             className="flex-1 bg-gray-200 py-3 rounded-xl font-medium cursor-pointer hover:bg-gray-300 transition"
//           >
//             Back
//           </button>

//           <button
//             onClick={onConfirm}
//             className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium cursor-pointer hover:bg-blue-700 transition"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerPreview;

import React from "react";
import { useNavigate } from "react-router-dom";

/* 🔥 UNIVERSAL NAME RESOLVER
   - array bhi handle karega
   - object bhi handle karega
   - id / _id dono handle karega
*/
const getNameById = (source, id) => {
  if (!source || !id) return "-";

  // Agar array hai
  if (Array.isArray(source)) {
    const item = source.find((i) => String(i.id || i._id) === String(id));
    return item?.name || "-";
  }

  // Agar object hai
  return source?.name || "-";
};

export default function CustomerPreview({
  data,
  categories,
  subCategories,
  services,
  onConfirm,
  onBack,
}) {
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        {/* HEADER */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Booking Preview
          </h1>
          <p className="text-gray-500 mt-1">
            Please review all details before confirmation
          </p>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Preview label="Full Name" value={data.name} />
          <Preview label="Phone Number" value={data.phone} />
          <Preview label="Email" value={data.email} />

          <Preview
            label="Booking Date"
            value={new Date(data.date).toLocaleDateString()}
          />

          <Preview label="Time Slot" value={data.time} />

          <Preview
            label="Category"
            value={getNameById(categories, data.category_id)}
          />

          <Preview
            label="Sub Category"
            value={getNameById(subCategories, data.sub_category_id)}
          />

          <Preview
            label="Service"
            value={getNameById(services, data.service_id)}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
          >
            Back
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00CED1] to-slate-500 text-white font-semibold transition"
          >
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 REUSABLE FIELD */
function Preview({ label, value }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-900">
        {value || "-"}
      </div>
    </div>
  );
}
