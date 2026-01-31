import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(FALLBACK_IMAGE);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://jumeirah.premierwebtechservices.com/backend/api/site/productsite/${slug}`,
      );

      if (res.data?.status) {
        setProduct(res.data.data);
        setActiveImage(res.data.data.main_image || FALLBACK_IMAGE);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <>
      {/* ================= BANNER ================= */}
      <section className="relative h-[38vh] w-full overflow-hidden md:mt-16">
        {/* BG IMAGE */}
        <img
          src={product.main_image || FALLBACK_IMAGE}
          alt={product.name}
          onError={(e) => (e.target.src = FALLBACK_IMAGE)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6 text-center py-28">
          <h1 className="text-3xl sm:text-5xl font-bold text-white uppercase">
            {product.name}
          </h1>

          <p className="mt-3 text-gray-200 uppercase tracking-widest">
            {product.categories?.join(", ")}
          </p>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      {/* 🔥 EXTRA TOP + BOTTOM PADDING */}
      <section className="px-4 sm:px-8 lg:px-16 xl:px-24 pt-20 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* ================= IMAGE SECTION ================= */}
          <div>
            {/* MAIN IMAGE */}
            <div className="border rounded-2xl overflow-hidden shadow-lg">
              <img
                src={activeImage}
                alt={product.name}
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                className="w-full h-[480px] object-cover"
              />
            </div>

            {/* GALLERY */}
            {product.gallery?.length > 0 && (
              <div className="flex gap-4 mt-5 overflow-x-auto pb-2">
                {[product.main_image, ...product.gallery].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                    className={`w-24 h-24 object-cover rounded-xl cursor-pointer border
                      ${
                        activeImage === img
                          ? "border-[#00CED1]"
                          : "border-gray-200"
                      }`}
                    alt="gallery"
                  />
                ))}
              </div>
            )}
          </div>

          {/* ================= CONTENT ================= */}
          <div>
            <h2 className="text-4xl font-bold uppercase">{product.name}</h2>

            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              SKU: {product.sku}
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description || "No description available"}
            </p>

            {/* ================= PRICE ================= */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#00CED1]/10 to-transparent border">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Price
              </p>

              <p className="text-4xl font-bold text-[#00CED1] mt-2">
                ₹{product.sale_price || product.price}
              </p>

              {product.discount && (
                <p className="text-sm text-red-500 mt-1">
                  Discount: {product.discount}%
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "product_cart",
                      JSON.stringify(product),
                    );
                    navigate("/checkout");
                  }}
                  className="px-8 py-3 bg-[#00CED1] text-black rounded-full font-semibold
                  hover:bg-gradient-to-r from-[#00CED1] to-black hover:text-white transition"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 border border-[#00CED1] text-[#00CED1] rounded-full
                  hover:bg-[#00CED1] hover:text-black transition"
                >
                  Back
                </button>
              </div>
            </div>

            {/* ================= CATEGORIES ================= */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 uppercase">
                Categories
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.categories?.map((cat, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm bg-[#00CED1]/20 text-black"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
