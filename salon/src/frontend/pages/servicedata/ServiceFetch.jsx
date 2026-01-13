import React, { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";

export default function ServicesPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const subcategoryFromQuery = searchParams.get("subcategory");

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      setError(null);
      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/site/sub-categories/${slug}`,
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) throw new Error("Category fetch failed");
      const json = await res.json();
      setCategories(json.data || []);
    } catch {
      setError("Failed to load categories");
    }
  };

  // ---------------- FETCH SERVICES ----------------
  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/site/all-services/${slug}?page=${page}`,
        { headers: { Accept: "application/json" } }
      );

      if (!res.ok) throw new Error("Service fetch failed");

      const json = await res.json();

      setServices(json.data || []);
      console.log("service data", json.data);
      debugger;
      setCurrentPage(json.meta?.current_page || page);
      setLastPage(json.meta?.last_page || 1);
    } catch {
      setServices([]);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- INITIAL / SLUG CHANGE LOAD ----------------
  useEffect(() => {
    if (!slug) return;

    fetchCategories();
    fetchServices(1);

    // ✅ AUTO SELECT SUBCATEGORY FROM URL
    setSelectedCategory(subcategoryFromQuery || null);
  }, [slug, subcategoryFromQuery]);

  // ---------------- DURATION FORMAT ----------------
  const formatDuration = (minutes) => {
    if (!minutes) return "-";

    if (minutes < 60) return `${minutes} mins`;

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) return hrs === 1 ? "1 hr" : `${hrs} hrs`;

    return `${hrs} hr ${mins} mins`;
  };

  // ---------------- FILTER ----------------
  const filteredServices = selectedCategory
    ? services.filter(
        (service) => service?.subcategory?.slug === selectedCategory
      )
    : services;

  return (
    <>
      {/* ================= TOP BANNER ================= */}
      <section
        className="relative h-[55vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            Our Services
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Where beauty meets luxury — crafted exclusively for you
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="sm:px-10 lg:px-24 py-14">
        {error && <p className="text-center text-red-600 mb-6">{error}</p>}

        {/* ================= FILTER BUTTONS ================= */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-[#00CED1] to-slate-500 text-white shadow-[0_0_15px_rgba(0,206,209,0.6)]"
                  : "bg-[#00CED1]/20 text-black hover:text-[#00CED1]"
              }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300
                ${
                  selectedCategory === cat.slug
                    ? "bg-gradient-to-r from-[#00CED1] to-slate-500 text-white shadow-[0_0_15px_rgba(0,206,209,0.6)]"
                    : "bg-[#00CED1]/20 text-black hover:text-[#00CED1]"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ================= SERVICES GRID ================= */}
        {loading ? (
          <p className="text-center py-20">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="relative border rounded-xl overflow-hidden
                  group hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow duration-300 bg-white"
                >
                  {/* PACKAGE BADGE */}
                  {service.package?.name && (
                    <span className="absolute top-3 right-3 z-20 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase">
                      {service.package.name}
                    </span>
                  )}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100
                    pointer-events-none
                    bg-gradient-to-r from-transparent via-[#00CED1] to-transparent
                    -translate-x-full group-hover:translate-x-full
                    transition-all duration-700 ease-in-out"
                  />

                  <div className="relative h-96 bg-gray-50 overflow-hidden z-10">
                    {service.main_image && (
                      <img
                        src={service.main_image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="relative z-10 p-3 text-center">
                    <h2 className="text-lg font-semibold text-gray-800 uppercase">
                      {service.name}
                    </h2>

                    <p className="text-sm text-gray-500 uppercase">
                      {formatDuration(service.duration)} ·{" "}
                      {service.subcategory?.name ?? "-"}
                    </p>

                    <div className="flex flex-col gap-3 mt-3">
                      <Link to={`/${service.slug}`}>
                        <button className="w-full border border-[#00CED1] text-[#00CED1] px-4 py-2 rounded-full hover:bg-[#00CED1] hover:text-black transition">
                          View Detail
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          navigate("/appointment", {
                            state: {
                              category_id: service.category?.id,
                              sub_category_id: service.subcategory?.id,
                              service_id: service.id,
                            },
                          })
                        }
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No services found
              </p>
            )}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {lastPage > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchServices(page)}
                className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold transition-all duration-300
                  ${
                    page === currentPage
                      ? "bg-gradient-to-r from-[#00CED1] to-slate-500 text-white shadow-[0_0_15px_rgba(0,206,209,0.6)]"
                      : "bg-[#00CED1]/20 text-black hover:text-[#00CED1]"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
