import React from "react";

const UserDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 mt-5">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome, John Doe
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <span className="text-gray-400 text-sm">Total Bookings</span>
          <span className="text-2xl font-bold text-gray-800 mt-2">12</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <span className="text-gray-400 text-sm">Upcoming Bookings</span>
          <span className="text-2xl font-bold text-gray-800 mt-2">3</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <span className="text-gray-400 text-sm">Completed Bookings</span>
          <span className="text-2xl font-bold text-gray-800 mt-2">9</span>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-600">Booking Code</th>
                <th className="px-4 py-2 text-gray-600">Service</th>
                <th className="px-4 py-2 text-gray-600">Date</th>
                <th className="px-4 py-2 text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  code: "LVN-2026-0032",
                  service: "Full Body Massage",
                  date: "2026-01-28",
                  status: "Confirmed",
                },
                {
                  code: "LVN-2025-0031",
                  service: "Hair Styling Deluxe",
                  date: "2026-01-27",
                  status: "Completed",
                },
                {
                  code: "LVN-2026-0030",
                  service: "Facial Treatment",
                  date: "2026-01-26",
                  status: "Pending",
                },
              ].map((booking, i) => (
                <tr
                  key={i}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-800">{booking.code}</td>
                  <td className="px-4 py-3 text-gray-800">{booking.service}</td>
                  <td className="px-4 py-3 text-gray-800">{booking.date}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      booking.status === "Completed"
                        ? "text-green-600"
                        : booking.status === "Confirmed"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
