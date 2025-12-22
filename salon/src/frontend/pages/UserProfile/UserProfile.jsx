import React from "react";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br    p-4 flex justify-center">
      <div
        className="w-full max-w-5xl bg-white/30  backdrop-blur-xl
        rounded-3xl shadow-2xl border border-white/20  p-6"
      >
        {/* ---------- Profile Header Section ---------- */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-green-100  shadow-inner">
          {/* Profile Pic */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="https://via.placeholder.com/150"
                alt="profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-green-900 shadow-xl"
              />
              <span className="absolute bottom-1 right-1 px-3 py-1 rounded-xl bg-[#FF9C00] text-white text-xs shadow-md cursor-pointer">
                Edit
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black">John Doe</h2>
            <p className="text-gray-600 ">john@example.com</p>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-green-900 text-white   shadow">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Form Section ---------- */}
        <h3 className="text-xl font-semibold text-black  mt-10 mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-green-100  rounded-2xl shadow-md">
          {/* Input Fields */}
          {[
            { label: "Full Name", value: "John Doe" },
            { label: "Email Address", value: "john@example.com" },
            { label: "Phone Number", value: "+91 9876543210" },
            { label: "Password", value: "XXXXXXXXX" },
          ].map((item, i) => (
            <div key={i}>
              <label className="text-gray-700  text-sm">{item.label}</label>
              {item.label === "Gender" ? (
                <select
                  className="w-full mt-1 p-3 bg-white/40  
                  border rounded-xl   shadow  "
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <input
                  type="text"
                  defaultValue={item.value}
                  className="w-full mt-1 p-3 bg-white/40  
                  border rounded-xl  shadow  "
                />
              )}
            </div>
          ))}

          <div className="sm:col-span-2">
            <label className="text-gray-700  text-sm">Address</label>
            <input
              type="text"
              defaultValue="123, Green Street, Jalandhar"
              className="w-full mt-1 p-3 bg-white/40 
              border rounded-xl  shadow "
            />
          </div>
        </div>

        {/* ---------- Buttons ---------- */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-2 rounded-xl bg-gray-300  shadow hover:scale-105 transition">
            Cancel
          </button>
          <button className="px-6 py-2 rounded-xl bg-[#FF9C00] text-white shadow-lg hover:bg-white hover:text-green-900 hover:scale-105 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
