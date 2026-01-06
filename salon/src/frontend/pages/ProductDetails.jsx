import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Testimonials from "../components/common/Testimonials";

// ---------- Helpers ----------
const formatDuration = (minutes) => {
  if (!minutes) return "—";
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

// ---------- Skeleton ----------
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const getTimePeriod = (time) => {
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10);

  if (hour >= 9 && hour < 12) return "9:00 AM – 12:00 PM";
  if (hour >= 12 && hour < 17) return "12:00 PM – 5:00 PM";

  return null; // ignore other times
};

export default function ServiceDetailsPage() {
  const [service, setService] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setService({
        service_name: "dxzczxc",
        description:
          '<p><span style="text-decoration: underline;"><strong>Product Description</strong></span><br />Discover the perfect blend of style and functionality with our premium travel bag, designed for those who demand excellence in every journey. Crafted with precision, this bag offers unmatched durability and versatility, setting a new standard for travel essentials.</p><ul><li><strong>Superior Durability:</strong> Constructed from high-quality materials that withstand the rigors of constant use, ensuring longevity and reliability.</li><li><strong>Spacious Interior:</strong> Ample space to accommodate all your essentials, with intelligently designed compartments for organized storage.</li><li><strong>Comfortable Carry:</strong> Ergonomic handles make transportation effortless, providing comfort during long travels.</li><li><strong>Timeless Design:</strong> A sleek, professional appearance that complements any attire, making it suitable for both business and leisure.</li><li><strong>Security Features:</strong> Equipped with robust zippers and a secure locking mechanism to keep your belongings safe at all times.<br /><br />Choose a travel companion that mirrors your standards of quality and sophistication. Elevate your travel experience with our expertly crafted bag, and make every journey an affair of elegance and practicality.</li></ul>',
        price: "22222.00",
        duration: 76543,
        location: "onsite",
        availability: "weekly",
        category: { name: "makeup" },
        subcategory: { name: "polishing" },
        package: { name: "Feminine" },
        gallery: [
          { image: "../../shape/food_shape_3.png" },
          { image: "../../shape/food_shape_4.png" },
          { image: "../../shape/footer_shape_1.png" },
          { image: "../../shape/footer_shape_2.png" },
          { image: "../../shape/footer_shape_3.png" },
          { image: "/blog/blog_1_1.jpg" },
          { image: "/blog/blog_1_2.jpg" },
          { image: "/blog/blog_1_3.jpg" },
          { image: "/blog/blog_1_4.jpg" },
          { image: "/blog/blog_2_1.jpg" },
          { image: "/blog/blog_2_2.jpg" },
          { image: "/blog/blog_2_3.jpg" },
          { image: "/blog/blog_2_4.jpg" },
          { image: "/blog/blog_3_1.jpg" },
          { image: "/blog/blog_3_2.jpg" },
          { image: "/blog/blog_3_3.jpg" },
          { image: "/blog/blog_3_4.jpg" },
        ],
        time_slots: [
          { day: "Monday", time_from: "09:48", time_to: "17:48" },
          { day: "Tuesday", time_from: "09:48", time_to: "17:48" },
          { day: "Wednesday", time_from: "09:48", time_to: "17:48" },
          { day: "Thursday", time_from: "09:48", time_to: "17:48" },
          { day: "Friday", time_from: "09:48", time_to: "17:48" },
          { day: "Saturday", time_from: "09:48", time_to: "17:48" },
        ],
        faqs: [
          { question: "fdxcvdfxcv", answer: "sdfsdfdsfsd" },
          { question: "Another question?", answer: "Another answer." },
        ],
      });
    }, 1200);
  }, []);

  if (!service) {
    return (
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-2 bg-black overflow-hidden">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Carousel */}
          <div className="bg-black rounded-2xl shadow p-4 relative">
            {/* Main Image */}
            <img
              src={service.gallery[activeImage].image}
              alt="service"
              className="h-96 w-full object-cover rounded-xl"
            />

            {/* Left Arrow */}
            <button
              onClick={() => setActiveImage((prev) => Math.max(prev - 1, 0))}
              disabled={activeImage === 0}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black disabled:opacity-40"
            >
              &#8592;
            </button>

            {/* Right Arrow */}
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  Math.min(prev + 1, service.gallery.length - 1)
                )
              }
              disabled={activeImage === service.gallery.length - 1}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black disabled:opacity-40"
            >
              &#8594;
            </button>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {service.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img.image}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 object-cover rounded cursor-pointer border ${
                    activeImage === i ? "border-pink-500" : "border-gray-200"
                  }`}
                  alt="thumb"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow p-6">
            {/* Service Name */}
            <h1 className="text-3xl font-semibold mb-2">
              {service.service_name}
            </h1>

            {/* Description from Summernote/TinyMCE */}
            <div
              className="text-gray-600 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(service.description),
              }}
            />
          </div>

          {/* Time Slots */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.time_slots.map((slot, i) => (
                <div key={i} className="border rounded-xl p-3 text-center">
                  <p className="font-medium">{slot.day}</p>
                  <p className="text-sm text-gray-500">
                    {slot.time_from} - {slot.time_to}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Time Slots */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-1">Available Time Slots</h2>
            <p className="text-sm text-gray-500 mb-5">
              Select a preferred time
            </p>

            <div className="space-y-5">
              {Object.entries(
                service.time_slots.reduce((acc, slot) => {
                  acc[slot.day] = acc[slot.day] || [];
                  acc[slot.day].push(slot);
                  return acc;
                }, {})
              ).map(([day, slots], i) => (
                <div key={i}>
                  <p className="mb-2 text-sm font-medium text-gray-700 capitalize">
                    {day}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {slots.map((slot, index) => (
                      <button
                        key={index}
                        className="
                px-4 py-2 rounded-full text-sm font-medium
                border border-gray-200
                bg-gray-50 text-gray-700
                hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600
                transition-all duration-200
                active:scale-95
              "
                      >
                        {slot.time_from} – {slot.time_to}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Time Slots */}
          {/* <div className="bg-white rounded-2xl shadow p-6 max-w-3xl">
            <h2 className="text-xl font-semibold mb-1">Available Time Slots</h2>
            <p className="text-sm text-gray-500 mb-6">
              Select a preferred time
            </p>

            <div className="space-y-8">
              {Object.entries(
                service.time_slots.reduce((acc, slot) => {
                  const period = getTimePeriod(slot.time_from);

                  acc[slot.day] = acc[slot.day] || {
                    Morning: [],
                    Afternoon: [],
                    Evening: [],
                  };

                  acc[slot.day][period].push(slot);
                  return acc;
                }, {})
              ).map(([day, periods]) => (
                <div key={day}>
                  <p className="mb-3 text-sm font-semibold text-gray-800 capitalize">
                    {day}
                  </p>

                  {Object.entries(periods).map(
                    ([period, slots]) =>
                      slots.length > 0 && (
                        <div key={period} className="mb-4">
                          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                            {period}
                          </p>

                          <div className="flex flex-wrap gap-3">
                            {slots.map((slot, index) => (
                              <button
                                key={index}
                                className="
                        px-4 py-2 rounded-full text-sm font-medium
                        border border-gray-200 bg-white text-gray-700
                        hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600
                        transition active:scale-95
                      "
                              >
                                {slot.time_from} – {slot.time_to}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          </div> */}

          <div className="bg-white rounded-2xl shadow p-6 max-w-3xl">
            <h2 className="text-xl font-semibold mb-1">Available Time Slots</h2>
            <p className="text-sm text-gray-500 mb-6">
              Select a preferred time
            </p>

            <div className="space-y-8">
              {Object.entries(
                service.time_slots.reduce((acc, slot) => {
                  const period = getTimePeriod(slot.time_from);
                  if (!period) return acc;

                  acc[slot.day] = acc[slot.day] || {
                    "9:00 AM – 12:00 PM": [],
                    "12:00 PM – 5:00 PM": [],
                  };

                  acc[slot.day][period].push(slot);
                  return acc;
                }, {})
              ).map(([day, periods]) => (
                <div key={day}>
                  <p className="mb-3 text-sm font-semibold text-gray-800 capitalize">
                    {day}
                  </p>

                  {Object.entries(periods).map(
                    ([period, slots]) =>
                      slots.length > 0 && (
                        <div key={period} className="mb-5">
                          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                            {period}
                          </p>

                          <div className="flex flex-wrap gap-3">
                            {slots.map((slot, index) => (
                              <button
                                key={index}
                                className="
                        px-4 py-2 rounded-full text-sm font-medium
                        border border-gray-200 bg-white text-gray-700
                        hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600
                        transition active:scale-95
                      "
                              >
                                {slot.time_from} – {slot.time_to}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">FAQs</h2>
            {service.faqs.map((faq, i) => (
              <div key={i} className="border-b py-3">
                <button
                  className="w-full text-left font-medium flex justify-between"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  {faq.question}
                  <span>{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && (
                  <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* STICKY SIDEBAR */}
        <div className="lg:sticky top-6 h-fit">
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <p className="text-2xl font-semibold">{service.service_name}</p>
            <p className="text-2xl font-semibold">₹{service.price}</p>
            <p className="text-sm text-gray-500">
              Duration: {formatDuration(service.duration)}
            </p>
            <p className="text-sm">Location: {service.location}</p>
            <p className="text-sm">Availability: {service.availability}</p>

            <button className="w-full mt-4 bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}
