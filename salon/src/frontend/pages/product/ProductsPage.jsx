import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =
  "https://jumeirah.premierwebtechservices.com/backend/api/site/productsite";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?page=${page}`);
      const json = await res.json();

      if (json.success) {
        setProducts(json.data || []);
        setCurrentPage(json.meta.current_page);
        setLastPage(json.meta.last_page);

        // extract unique category names
        const uniqueCats = new Set();
        json.data.forEach((p) => {
          p.categories?.forEach((cat) => uniqueCats.add(cat));
        });
        setCategories(Array.from(uniqueCats));
      }
    } catch (err) {
      console.error("Product fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  // ================= FILTER =================
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categories?.includes(selectedCategory))
    : products;

  return (
    <>
      {/* ================= TOP BANNER ================= */}
      <section className="relative h-[38vh] w-full overflow-hidden md:mt-16">
        <img
          src={products[0]?.main_image || FALLBACK_IMG}
          alt="Products Banner"
          onError={(e) => (e.target.src = FALLBACK_IMG)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            Our Products
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
            Premium beauty products crafted for luxury & care
          </p>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <section className="px-4 sm:px-10 lg:px-24 pt-20 pb-24">
        {/* ================= FILTER ================= */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition
              ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-[#00CED1] to-slate-500 text-white"
                  : "bg-[#00CED1]/20 hover:text-[#00CED1]"
              }`}
          >
            All
          </button>

          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition
                ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#00CED1] to-slate-500 text-white"
                    : "bg-[#00CED1]/20 hover:text-[#00CED1]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <p className="text-center py-24 text-[#00CED1]">
            Loading products...
          </p>
        )}

        {/* ================= PRODUCT GRID ================= */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-xl overflow-hidden bg-white
                  hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)]
                  transition-shadow duration-300"
                >
                  {/* IMAGE */}
                  <div className="h-80 overflow-hidden">
                    <img
                      src={product.main_image || FALLBACK_IMG}
                      alt={product.name}
                      onError={(e) => (e.target.src = FALLBACK_IMG)}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold uppercase">
                      {product.name}
                    </h2>

                    <p className="text-sm text-gray-500 uppercase">
                      {product.categories?.join(", ")}
                    </p>

                    <p className="mt-2 text-xl font-bold text-[#00CED1]">
                      ₹{product.sale_price ?? product.price}
                    </p>

                    <Link to={`/product/${product.slug}`}>
                      <button
                        className="mt-4 w-full bg-[#00CED1] px-4 py-2 rounded-full
                        hover:bg-gradient-to-r from-[#00CED1] to-black hover:text-white"
                      >
                        View Detail
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {lastPage > 1 && (
          <div className="flex justify-center mt-20 gap-3">
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchProducts(page)}
                className={`w-12 h-12 rounded-full font-semibold transition
                  ${
                    page === currentPage
                      ? "bg-gradient-to-r from-[#00CED1] to-slate-500 text-white"
                      : "bg-[#00CED1]/20 hover:text-[#00CED1]"
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
