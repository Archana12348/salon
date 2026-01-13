import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ServiceView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [previewIndex, setPreviewIndex] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetch(
      `https://jumeirah.premierwebtechservices.com/backend/api/servicesite/${slug}`
    )
      .then((res) => res.json())
      .then((data) => {
        setService(data?.data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg font-semibold">
        Loading Service...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600">
        Service not found
      </div>
    );
  }

  const show = (val) => (val ? val : "N/A");

  return (
    <div
      className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:mt-20"
      style={{ fontFamily: "var(--font-heading--family)" }}
    >
      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-md font-semibold text-[#00CED1] hover:text-black underline"
      >
        ← Back
      </button>

      {/* ================= HERO ================= */}
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={service.main_image}
          alt={service.name}
          className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
        />

        <div>
          <span className="text-sm uppercase font-semibold text-pink-600">
            {show(service.category?.name)} / {show(service.subcategory?.name)}
          </span>

          <h1 className="text-4xl font-bold mt-2 mb-6 uppercase">
            {show(service.name)}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6 ">
            <Info label="Price" value={`₹${show(service.price)}`} />
            <Info label="Package" value={show(service.package_name)} />
            <Info label="Duration" value={`${show(service.duration)} mins`} />
            <Info label="Availability" value={show(service.availability)} />
            <Info label="Location" value={show(service.location)} />
          </div>

          {/* ================= BOOK APPOINTMENT BUTTON ================= */}
          <button
            onClick={() => navigate("/appointment")}
            className="w-full bg-[#00CED1] text-black px-4 py-2 rounded-full hover:bg-gradient-to-r from-[#00CED1] to-black hover:text-white transition"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <Section title="Service Description">
        {service.description ? (
          <div className="rounded-xl p-6 border border-[#00CED1]/50 bg-[linear-gradient(120deg,rgba(0,206,209,0.15),rgba(255,255,255,0.95))]">
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          </div>
        ) : (
          <Empty />
        )}
      </Section>

      {/* ================= GALLERY ================= */}
      <Section title="Gallery">
        {service.gallery?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {service.gallery.map((img, index) => (
              <img
                key={img.id}
                src={`https://jumeirah.premierwebtechservices.com/backend/storage/salon_services/gallery/${img.image}`}
                alt=""
                onClick={() => setPreviewIndex(index)}
                className="w-full h-44 object-cover rounded-xl shadow hover:scale-105 transition"
              />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Section>

      {/* ================= IMAGE PREVIEW MODAL ================= */}
      {previewIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setPreviewIndex(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold"
            >
              ✕
            </button>

            {/* PREV */}
            <button
              onClick={() =>
                setPreviewIndex((prev) =>
                  prev === 0 ? service.gallery.length - 1 : prev - 1
                )
              }
              className="absolute left-2 md:-left-14 text-white text-4xl font-bold px-3"
            >
              ‹
            </button>

            {/* IMAGE */}
            <img
              src={`https://jumeirah.premierwebtechservices.com/backend/storage/salon_services/gallery/${service.gallery[previewIndex].image}`}
              alt="Preview"
              className="max-h-[80vh] w-full object-contain rounded-xl shadow-lg"
            />

            {/* NEXT */}
            <button
              onClick={() =>
                setPreviewIndex((prev) =>
                  prev === service.gallery.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 md:-right-14 text-white text-4xl font-bold px-3"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* ================= TIME SLOTS ================= */}
      <Section title="Time Slots">
        {service.time_slots?.length > 0 ? (
          <ul className="list-disc ml-6">
            {service.time_slots.map((slot, i) => (
              <li key={i}>{slot}</li>
            ))}
          </ul>
        ) : (
          <Empty />
        )}
      </Section>

      {/* ================= AVAILABLE DATES ================= */}
      <Section title="Available Dates">
        {service.specific_dates?.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-4 ">
            {service.specific_dates.map((date) => (
              <div
                key={date.id}
                className="border rounded-lg p-4 bg-gray-50  border-[#00CED1]/50 bg-[linear-gradient(120deg,rgba(0,206,209,0.15),rgba(255,255,255,0.95))]
        hover:shadow-[0_20px_40px_rgba(0,206,209,0.3)]
        hover:-translate-y-1
        transition-all duration-300"
              >
                <p className="font-semibold">Date: {date.specific_date}</p>
                <p className="text-sm text-gray-600">
                  Time: {date.time_from} – {date.time_to}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Section>

      {/* ================= UNAVAILABILITIES ================= */}
      <Section title="Unavailabilities">
        {service.unavailabilities?.length > 0 ? (
          <ul className="list-disc ml-6">
            {service.unavailabilities.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        ) : (
          <Empty />
        )}
      </Section>

      {/* ================= RATINGS ================= */}
      <Section title="Ratings">
        {service.ratings?.length > 0 ? (
          <div className="space-y-4">
            {service.ratings.map((rate, i) => (
              <div
                key={i}
                className="bg-white border border-gray-300 rounded-lg p-4 flex items-center gap-4"
              >
                {/* Stars */}
                <div className="flex text-yellow-500 text-lg">
                  {"★".repeat(rate)}
                  {"☆".repeat(5 - rate)}
                </div>

                {/* Value */}
                <span className="text-sm font-semibold text-gray-700">
                  {rate} / 5
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Section>

      {/* ================= FAQ (ACCORDION) ================= */}
      <Section title="FAQs">
        {service.faqs?.length > 0 ? (
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div key={faq.id} className="border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-[#d7feff] font-semibold text-left"
                >
                  <span>Question: {faq.question}</span>
                  <span>{openFaq === index ? "−" : "+"}</span>
                </button>

                {openFaq === index && (
                  <div className="p-4 bg-white text-gray-700">
                    <strong>Answer:</strong> {faq.answer || "N/A"}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Section>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Info({ label, value, className = "" }) {
  return (
    <div
      className={`border rounded-lg p-3  border-[#00CED1]/50 bg-[linear-gradient(120deg,rgba(0,206,209,0.15),rgba(255,255,255,0.95))]
        hover:shadow-[0_20px_40px_rgba(0,206,209,0.3)]
        hover:-translate-y-1
        transition-all duration-300
        ${className}`}
    >
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Empty() {
  return <p className="text-gray-500">N/A</p>;
}
