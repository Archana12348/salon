import React, { useEffect, useState } from "react";

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user_auth from localStorage
    const userAuth = localStorage.getItem("user_auth");

    if (!userAuth) {
      setLoading(false);
      alert("User not logged in");
      return;
    }

    // Parse JSON and get token
    const token = JSON.parse(userAuth)?.token;

    if (!token) {
      setLoading(false);
      alert("Token not found");
      return;
    }

    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/bookings",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Add token here
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-gray-500 text-lg">Loading bookings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {booking.service?.service_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Booking Code: {booking.booking_code}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium text-gray-800">
                    {booking.date}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Time</span>
                  <span className="font-medium text-gray-800">
                    {booking.time_from} – {booking.time_to}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Name</span>
                  <span className="font-medium text-gray-800">
                    {booking.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Phone</span>
                  <span className="font-medium text-gray-800">
                    {booking.phone}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;
