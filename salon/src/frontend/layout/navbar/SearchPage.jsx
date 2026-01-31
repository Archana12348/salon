import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

const API_URL =
  "https://jumeirah.premierwebtechservices.com/backend/api/site/search";

// ✅ IMAGE BASE PATHS
const SERVICE_IMAGE_BASE =
  "https://jumeirah.premierwebtechservices.com/backend/public/storage/salon_services/main/";

const PRODUCT_IMAGE_BASE =
  "https://jumeirah.premierwebtechservices.com/backend/storage/products/main/";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ================= FETCH SEARCH =================
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}?q=${query}`);
        const json = await res.json();

        if (json.success) {
          setResults(json.data || []);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search error", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // ================= IMAGE PATH HANDLER =================
  const getImage = (item) => {
    if (!item.main_image) return null;

    // agar full URL already hai
    if (item.main_image.startsWith("http")) return item.main_image;

    // service vs product
    return item.type === "service"
      ? SERVICE_IMAGE_BASE + item.main_image
      : PRODUCT_IMAGE_BASE + item.main_image;
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-lg">
      <div className="h-screen overflow-y-auto text-white px-4 py-20 max-w-5xl mx-auto">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-center gap-4 mb-8">
          <ArrowLeft
            className="cursor-pointer text-[#00CED1]"
            onClick={() => navigate(-1)}
          />

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search services, products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="
                w-full py-3 pl-12 rounded-full
                bg-black text-white
                border border-[#00CED1]
                focus:outline-none focus:ring-2 focus:ring-[#00CED1]
              "
            />
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00CED1]"
            />
          </div>
        </div>

        {/* ================= STATUS ================= */}
        {!query && (
          <p className="text-sm text-gray-400">
            Start typing to search services or products
          </p>
        )}

        {loading && (
          <p className="text-center py-10 text-[#00CED1]">Searching...</p>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-center py-10 text-gray-400">
            No results found for <span className="text-[#00CED1]">{query}</span>
          </p>
        )}

        {/* ================= RESULTS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  item.type === "service"
                    ? `/${item.slug}`
                    : `/product/${item.slug}`,
                )
              }
              className="
                cursor-pointer flex gap-4 p-4 rounded-xl
                bg-black/60 border border-[#00CED1]/40
                hover:shadow-[0_20px_40px_rgba(0,206,209,0.4)]
                transition
              "
            >
              {/* IMAGE */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                {getImage(item) ? (
                  <img
                    src={getImage(item)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="flex-1">
                <h3 className="font-semibold uppercase text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400 capitalize">{item.type}</p>

                <p className="mt-1 text-[#00CED1] font-bold">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
