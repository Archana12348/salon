import React, { useEffect, useState } from "react";

export default function ServicesPage() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      setError(null);

      const res = await fetch(
        "http://127.0.0.1:8000/api/site/sub-categories/4",
        {
          headers: { Accept: "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error(`Categories API failed (${res.status})`);
      }

      const json = await res.json();

      if (!json || !Array.isArray(json.data)) {
        throw new Error("Invalid categories response");
      }

      setCategories(json.data);
    } catch (err) {
      console.error("fetchCategories:", err.message);
      setCategories([]);
      setError("Failed to load categories");
    }
  };

  // ---------------- FETCH SERVICES ----------------
  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `http://127.0.0.1:8000/api/site/all-services/4?page=${page}`,
        {
          headers: { Accept: "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error(`Services API failed (${res.status})`);
      }

      const json = await res.json();

      if (!json || !Array.isArray(json.data)) {
        throw new Error("Invalid services response");
      }

      setServices(json.data);
      setCurrentPage(page);
      setLastPage(1); // update when API pagination is ready
    } catch (err) {
      console.error("fetchServices:", err.message);
      setServices([]);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    fetchCategories();
    fetchServices(1);
  }, []);

  // ---------------- FILTER SERVICES ----------------
  const filteredServices = selectedCategory
    ? services.filter(
        (service) => service?.subcategory?.slug === selectedCategory
      )
    : services;

  // ---------------- CATEGORY CLICK ----------------
  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    fetchServices(1);
  };

  // ---------------- PAGINATION ----------------
  const handlePageChange = (page) => {
    fetchServices(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Services</h1>

      {/* ---------------- ERROR ---------------- */}
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      {/* ---------------- CATEGORIES ---------------- */}
      <div className="flex gap-3 flex-wrap mb-6 justify-center">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedCategory === null ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition capitalize ${
              selectedCategory === cat.slug
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ---------------- SERVICES ---------------- */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-12">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border shadow-lg hover:shadow-xl hover:bg-orange-50 transition-colors duration-200 overflow-hidden"
              >
                {/* IMAGE */}
                {service.main_image && (
                  <div className="h-72 w-full overflow-hidden">
                    <img
                      src={service.main_image}
                      alt={service.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-5 space-y-2">
                  {service.package_name && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                      {service.package_name}
                    </span>
                  )}

                  <h2 className="text-lg font-semibold">{service.name}</h2>

                  <p className="text-sm text-gray-600">
                    Duration: {service.duration} mins
                  </p>

                  <p className="text-sm text-gray-500">
                    Category: {service.category?.name ?? "—"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Subcategory: {service.subcategory?.name ?? "—"}
                  </p>
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

      {/* ---------------- PAGINATION ---------------- */}
      <div className="flex gap-2 mt-8 justify-center">
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
