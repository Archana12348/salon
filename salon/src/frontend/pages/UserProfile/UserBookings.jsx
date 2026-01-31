// import React, { useEffect, useState } from "react";

// function UserBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userAuth = localStorage.getItem("user_auth");
//     if (!userAuth) return setLoading(false);

//     const token = JSON.parse(userAuth)?.token;
//     if (!token) return setLoading(false);

//     fetch(
//       "https://jumeirah.premierwebtechservices.com/backend/api/site/bookings",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setBookings(data.data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const statusStyle = (status) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-100 text-green-700";
//       case "confirmed":
//         return "bg-blue-100 text-blue-700";
//       case "pending":
//         return "bg-yellow-100 text-yellow-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
//         Loading bookings...
//       </div>
//     );
//   }

//   return (
//     <div
//       style={
//         {
//           // backgroundImage:
//           //   "linear-gradient(120deg, rgba(0,206,209,0.5), rgba(255,255,255,0.95))",
//         }
//       }
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:mt-14 ">
//         <h1
//           className="text-3xl font-semibold text-gray-800 mb-10"
//           style={{ fontFamily: "var(--font-heading--family)" }}
//         >
//           My Bookings
//         </h1>

//         {bookings.length === 0 ? (
//           <div className="text-center text-gray-500">No bookings available</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//             {bookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 className="bg-sky-50 group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow rounded-2xl shadow-md  overflow-hidden"
//               >
//                 {/* HEADER */}
//                 <div className="p-4 border-b flex items-start justify-between">
//                   <div>
//                     <h2 className="text-lg font-semibold uppercase text-gray-800">
//                       {booking.service?.service_name}
//                     </h2>
//                     <span className="text-xs text-gray-500">
//                       Booking Code: {booking.booking_code}
//                     </span>
//                   </div>

//                   <span
//                     className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle(
//                       booking.status,
//                     )}`}
//                   >
//                     {booking.status}
//                   </span>
//                 </div>

//                 {/* BODY */}
//                 <div className="p-4 space-y-4 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Date</span>
//                     <span className="font-medium text-gray-800">
//                       {booking.date}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Time</span>
//                     <span className="font-medium text-gray-800">
//                       {booking.time_from} – {booking.time_to}
//                     </span>
//                   </div>

//                   <div className="border-t pt-4 space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Name</span>
//                       <span className="font-medium text-gray-800">
//                         {booking.name}
//                       </span>
//                     </div>

//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Phone</span>
//                       <span className="font-medium text-gray-800">
//                         {booking.phone}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserBookings;

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Review modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const userAuth = localStorage.getItem("user_auth");
    if (!userAuth) return setLoading(false);

    const token = JSON.parse(userAuth)?.token;
    if (!token) return setLoading(false);

    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/bookings",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => res.json())

      .then((data) => {
        setBookings(data.data || []);
        console.log("data", data);
        debugger;
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

  // 🔹 Submit Review
  const submitReview = async () => {
    if (!selectedBooking) return;

    const userAuth = JSON.parse(localStorage.getItem("user_auth"));
    const token = userAuth?.token;

    try {
      setSubmitting(true);

      const payload = {
        service_id: selectedBooking.service_id,
        booking_id: selectedBooking.id,
        rating,
        review: reviewMsg,
      };

      const response = await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/site/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      console.log("Review Response:", data);

      // ✅ SUCCESS
      if (data?.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === selectedBooking.id ? { ...b, reviewed: true } : b,
          ),
        );

        setShowModal(false);
        setRating(0);
        setReviewMsg("");

        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your review has been submitted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      // ⚠️ ALREADY REVIEWED / FAILED
      else {
        Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: data?.message || "You have already reviewed this booking.",
          confirmButtonColor: "#0284c7",
        });

        // 👇 Modal band + Reviewed mark
        setBookings((prev) =>
          prev.map((b) =>
            b.id === selectedBooking.id ? { ...b, reviewed: true } : b,
          ),
        );
        setShowModal(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setSubmitting(false);
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
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:mt-14">
        <h1 className="text-3xl font-semibold text-gray-800 mb-10">Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500">No bookings available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="!border !border-[#9ee0e3] rounded-xl overflow-hidden
                  group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
              >
                {/* HEADER */}
                <div className="p-4 border-b flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold uppercase text-gray-800">
                      {booking.service?.service_name}
                    </h2>
                    <span className="text-xs text-gray-500">
                      Booking Code: {booking.booking_code}
                    </span>
                  </div>

                  <div className="text-right space-y-2">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusStyle(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </span>

                    {/* 🔹 Add Review Button */}
                    {booking.status === "completed" && !booking.reviewed ? (
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowModal(true);
                        }}
                        className="block text-xs text-sky-600 font-semibold hover:underline"
                      >
                        + Add Review
                      </button>
                    ) : booking.reviewed ? (
                      <span className="block text-xs text-green-600 font-semibold">
                        Reviewed
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* BODY */}
                <div className="p-4 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">{booking.date}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium">
                      {booking.time_from} – {booking.time_to}
                    </span>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium">{booking.name}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium">{booking.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 REVIEW MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Add Review</h2>

            {/* ⭐ Stars */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* 💬 Message Box */}
            <textarea
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Write your review..."
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setRating(0);
                  setReviewMsg("");
                }}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                disabled={submitting || rating === 0}
                className="px-4 py-2 text-sm rounded-lg bg-sky-600 text-white disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserBookings;
