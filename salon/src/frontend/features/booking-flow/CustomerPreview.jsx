import React from "react";

const CustomerPreview = ({ data, onConfirm, onBack }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[500px] p-8 rounded-2xl shadow-2xl animate-fadeIn relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onBack}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* HEADING */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Enter Customer Details
        </h2>

        {/* CUSTOMER DETAIL PREVIEW */}
        <div className="space-y-5">
          <div>
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              disabled
              value={data.name}
              className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Phone Number</label>
            <input
              disabled
              value={data.phone}
              className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              disabled
              value={data.email}
              className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Select Service
            </label>
            <input
              disabled
              value={data.service}
              className="w-full mt-1 border rounded-lg py-2 px-3 bg-gray-100"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-7">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-200 py-3 rounded-xl font-medium cursor-pointer hover:bg-gray-300 transition"
          >
            Back
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium cursor-pointer hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPreview;
