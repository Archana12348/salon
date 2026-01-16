import React, { useEffect, useState } from "react";

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userAuth = localStorage.getItem("user_auth");
    if (!userAuth) return setLoading(false);

    const token = JSON.parse(userAuth)?.token;
    if (!token) return setLoading(false);

    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        Loading bookings...
      </div>
    );
  }

  return (
    <div
      style={
        {
          // backgroundImage:
          //   "linear-gradient(120deg, rgba(0,206,209,0.5), rgba(255,255,255,0.95))",
        }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:mt-14 ">
        <h1
          className="text-3xl font-semibold text-gray-800 mb-10"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500">No bookings available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-sky-50 group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow rounded-2xl shadow-md  overflow-hidden"
              >
                {/* HEADER */}
                <div className="p-4 border-b flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {booking.service?.service_name}
                    </h2>
                    <span className="text-xs text-gray-500">
                      Booking Code: {booking.booking_code}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* BODY */}
                <div className="p-4 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-800">
                      {booking.date}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-gray-800">
                      {booking.time_from} – {booking.time_to}
                    </span>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium text-gray-800">
                        {booking.name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium text-gray-800">
                        {booking.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookings;
