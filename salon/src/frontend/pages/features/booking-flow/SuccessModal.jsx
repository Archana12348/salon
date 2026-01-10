// const SuccessModal = ({ open, setOpen, booking }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
//         <h2 className="text-xl font-bold mb-3">🎉 Booking Successful!</h2>
//         <p>Your booking has been confirmed.</p>
//         <p>Booking Code: {booking.booking_code}</p>

//         <button
//           onClick={setOpen} // ← FIXED
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SuccessModal;

import React from "react";
import { Check } from "lucide-react";

const SuccessModal = ({ open, setOpen, booking }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl text-center animate-scaleIn">
        {/* ICON */}
        <div className="flex justify-center -mt-10">
          <div className="w-20 h-20 bg-[#00CED1] rounded-full flex items-center justify-center shadow-lg">
            <Check size={38} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Awesome!</h2>

          <p className="text-gray-600 text-sm mb-4">
            Your booking has been confirmed.
            <br />
            Check your email for details.
          </p>

          <p className="text-sm text-gray-500 mb-5">
            Booking Code:
            <span className="font-semibold text-gray-800 ml-1">
              {booking.booking_code}
            </span>
          </p>

          {/* BUTTON (FUNCTIONALITY SAME) */}
          <button
            onClick={setOpen}
            className="w-full   border border-[#00CED1]
              text-[#00CED1]
                     bg-cyan-50
               shadow-[0_0_15px_rgba(0,206,209,0.4)]
               transition-all duration-300
               hover:bg-[#00CED1] hover:text-white
              hover:scale-105 hover:shadow-[0_0_35px_rgba(0,206,209,0.9)]  py-3 rounded-xl font-semibold "
          >
            OK
          </button>
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.85);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default SuccessModal;
