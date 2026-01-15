import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userAuth = localStorage.getItem("user_auth");

    if (!userAuth) {
      alert("User not logged in");
      setLoading(false);
      return;
    }

    const { token } = JSON.parse(userAuth);

    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/user/warehouse",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-gray-500 text-lg">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 flex justify-center mt-12">
      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
        {/* ---------- Profile Header ---------- */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-green-100 shadow-inner">
          <div className="relative">
            <img
              src={`https://jumeirah.premierwebtechservices.com/backend${user.avatar}`}
              alt="profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-green-900 shadow-xl"
            />
            <span className="absolute bottom-1 right-1 px-3 py-1 rounded-xl bg-[#FF9C00] text-white text-xs shadow-md cursor-pointer">
              Edit
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>

            <div className="mt-4">
              <span className="px-4 py-2 rounded-full bg-green-900 text-white shadow">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Form Section ---------- */}
        <h3 className="text-xl font-semibold text-black mt-10 mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-green-100 rounded-2xl shadow-md">
          <div>
            <label className="text-gray-700 text-sm">Full Name</label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Email Address</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Phone Number</label>
            <input
              type="text"
              defaultValue={user.phone}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Gender</label>
            <select
              defaultValue={user.gender}
              className="w-full mt-1 p-3 bg-white/40 border rounded-xl shadow"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* ---------- Buttons ---------- */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-2 rounded-xl bg-gray-300 shadow hover:scale-105 transition">
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
