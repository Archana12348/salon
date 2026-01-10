import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          "https://jumeirah.premierwebtechservices.com/backend/api/site/testimonials"
        );
        if (res.data.success) {
          setTestimonials(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading testimonials...</p>;
  }

  if (testimonials.length === 0) {
    return <p className="text-center mt-5">No testimonials found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={t.user.avatar ? t.user.avatar : "/default-avatar.png"}
                alt={t.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{t.user.name}</p>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < t.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{t.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
