import React, { useState } from "react";
import { FiStar, FiTruck, FiTag, FiShoppingCart } from "react-icons/fi";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("500 ml");

  const [showMore, setShowMore] = useState(false); // ⭐ VIEW MORE toggle

  const sizes = [
    { label: "200 ml", price: 25 },
    { label: "500 ml", price: 35 },
    { label: "1 L", price: 65 },
  ];

  const product = {
    name: "Amul Gold Full Cream Milk",
    image: "/product/product_1_1.jpg",
    description:
      "Amul Gold Full Cream Milk (Polypack) is homogenized toned pasteurized milk. Rich and creamy, this milk is an excellent source of vitamin A and D.",
    highlights: ["Full Cream Milk"],
    nutrition: [
      { label: "Energy Per 100 g (kcal)", value: "86.4" },
      { label: "Protein Per 100 g (g)", value: "3.1" },
      { label: "Total Carbohydrates Per 100 g (g)", value: "5" },
      { label: "Added Sugars Per 100 g (g)", value: "0" },
      { label: "Total Fat Per 100 g (g)", value: "6" },
      { label: "Saturated Fat Per 100 g (g)", value: "3.9" },
      { label: "Trans Fat Per 100 g (g)", value: "0" },
      { label: "Calcium Per 100 g (g)", value: "0.108" },
    ],
    keyFeatures: [
      "Wholesome and healthy",
      "Pasteurised milk",
      "Rich in calcium",
    ],

    unit: "500 ml",
    type: "Full Cream Milk",
    license: "10018021003047",
    shelfLife: "2 days",
    returnPolicy:
      "Non-returnable. For damaged or incorrect item, request replacement within 24 hours.",
    country: "India",
    email: "info@blinkit.com",

    seller: {
      name: "Zomato Hyperpure Private Limited",
      address: "SCS 49 & 50 Choti Baradari Part-2 Jalandhar Punjab - 144003",
      fssai: "10020064002537",
    },

    manufacturer: {
      name: "Gujarat Cooperative Milk Marketing Federation Ltd",
      address: "Amul Dairy Road, Anand – 388001, Gujarat",
    },

    supplier: {
      name: "Blinkit Commerce Pvt. Ltd",
      address: "Plot No. 88, Sector 44, Gurugram – 122003",
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto p-4 md:p-8 grid md:grid-cols-12 gap-10">
        {/* ----------------------------------------------------
            📱 MOBILE VIEW
        ----------------------------------------------------- */}
        <div className="md:hidden">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl w-full object-contain border p-4 bg-white"
          />

          {/* Gallery */}
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-lg w-20 h-20 flex items-center justify-center bg-white"
              >
                <img
                  src={product.image}
                  alt="thumb"
                  className="object-contain w-14 h-14"
                />
              </div>
            ))}
          </div>

          {/* Name */}
          <h1 className="text-xl font-semibold text-gray-900 mt-4">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ₹{sizes.find((s) => s.label === selectedSize)?.price}
          </p>

          {/* Size Selector */}
          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-1">Select Size</p>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  className={`px-4 py-2 border rounded-lg text-sm ${
                    selectedSize === size.label
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button className="mt-4 flex items-center justify-center space-x-2 bg-green-600 text-white font-medium px-6 py-3 rounded-xl w-full">
            <FiShoppingCart size={20} />
            <span>Add to cart</span>
          </button>

          <div className="border-b my-6"></div>
        </div>

        {/* ----------------------------------------------------
            🖥 DESKTOP LEFT — UPDATED WITH VIEW MORE 🔥
        ----------------------------------------------------- */}
        <div className="hidden md:block md:col-span-7 bg-white rounded-2xl shadow-sm p-8">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl w-full object-contain border p-4"
          />

          {/* Gallery */}
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border rounded-lg w-20 h-20 flex items-center justify-center hover:border-green-500 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt="thumb"
                  className="object-contain w-14 h-14"
                />
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-3">Highlights</h2>

            <div className="inline-block px-3 py-1 border rounded-full text-sm bg-gray-100">
              {product.highlights[0]}
            </div>

            {/* PRODUCT DETAILS + DESCRIPTION (COLLAPSIBLE) */}
            <h2 className="text-lg font-semibold mt-6 mb-2">Product Details</h2>

            {/* Always show first 2 lines */}
            <div className="text-gray-700 space-y-2">
              {product.nutrition.slice(0, 2).map((n, i) => (
                <p key={i}>
                  <b>{n.label}:</b> {n.value}
                </p>
              ))}
            </div>

            {/* COLLAPSIBLE ANIMATED SECTION */}
            <div
              className={`
    overflow-hidden transition-all duration-500 ease-in-out
    ${showMore ? "max-h-[2000px] mt-3" : "max-h-0"}
  `}
            >
              <div className="space-y-3  text-gray-700">
                {/* Remaining nutrition — Staggered */}
                {product.nutrition.slice(2).map((n, i) => (
                  <p
                    key={i}
                    style={{ animationDelay: `${i * 80}ms` }}
                    className="animate-slideUp text-gray-700"
                  >
                    <b>{n.label}:</b> {n.value}
                  </p>
                ))}

                {/* Description */}
                <h2 className="text-lg font-semibold mt-4 animate-slideUp">
                  Description
                </h2>
                <p className="animate-slideUp">{product.description}</p>

                {/* Key Features */}
                <h2 className="text-lg font-semibold mt-4 animate-slideUp">
                  Key Features
                </h2>
                <ul className="list-disc ml-6">
                  {product.keyFeatures.map((f, i) => (
                    <li
                      key={i}
                      style={{ animationDelay: `${i * 80}ms` }}
                      className="animate-slideUp"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Extra Info */}
                <div className="mt-4 space-y-2">
                  {[
                    ["Unit", product.unit],
                    ["Type", product.type],
                    ["FSSAI License", product.license],
                    ["Shelf Life", product.shelfLife],
                    ["Return Policy", product.returnPolicy],
                    ["Country of Origin", product.country],
                    ["Customer Care", product.email],
                  ].map(([label, val], i) => (
                    <p
                      key={i}
                      style={{ animationDelay: `${i * 80}ms` }}
                      className="animate-slideUp"
                    >
                      <b>{label}:</b> {val}
                    </p>
                  ))}
                </div>

                {/* Manufacturer */}
                <div className="mt-4 animate-slideUp">
                  <h3 className="font-semibold">Manufacturer</h3>
                  <p>{product.manufacturer.name}</p>
                  <p>{product.manufacturer.address}</p>
                </div>

                {/* Supplier */}
                <div className="mt-4 animate-slideUp">
                  <h3 className="font-semibold">Supplier</h3>
                  <p>{product.supplier.name}</p>
                  <p>{product.supplier.address}</p>
                </div>

                {/* Seller */}
                <div className="mt-4 animate-slideUp">
                  <h3 className="font-semibold">Seller</h3>
                  <p>{product.seller.name}</p>
                  <p>{product.seller.address}</p>
                  <p>
                    <b>FSSAI:</b> {product.seller.fssai}
                  </p>
                </div>
              </div>
            </div>

            {/* VIEW MORE BUTTON WITH ROTATING ARROW */}
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-green-600 mt-3 font-medium text-sm flex items-center space-x-1"
            >
              <span>{showMore ? "View less" : "View more details"}</span>

              <span
                className={`transition-transform duration-300 ${
                  showMore ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------
            🖥 DESKTOP RIGHT — STICKY BOX
        ----------------------------------------------------- */}
        <div className="hidden md:block md:col-span-5">
          <div className="sticky top-24 bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-2xl font-semibold">{product.name}</h1>

            <div className="flex items-center space-x-1 text-yellow-500 my-3">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={18} fill="currentColor" />
              ))}
              <span className="text-gray-600 text-sm">(4.8/5)</span>
            </div>

            {/* Size Buttons */}
            <p className="font-medium mb-1">Select Size</p>
            <div className="flex space-x-2 mb-4">
              {sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  className={`px-4 py-2 border rounded-lg text-sm ${
                    selectedSize === size.label
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>

            {/* Price */}
            <p className="text-3xl font-bold mb-4">
              ₹{sizes.find((s) => s.label === selectedSize)?.price}
            </p>

            {/* Add to Cart */}
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl w-full">
              <FiShoppingCart size={20} />
              <span>Add to cart</span>
            </button>

            {/* Why Shop */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">
                Why shop from Blinkit?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <FiTruck className="text-green-600 mt-1" size={18} />
                  <span>
                    <b>Superfast Delivery</b> — Delivered from dark stores.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiTag className="text-green-600 mt-1" size={18} />
                  <span>
                    <b>Best Prices & Offers</b> — Direct deals.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiStar className="text-green-600 mt-1" size={18} />
                  <span>
                    <b>Wide Assortment</b> — 5000+ products.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------
            📱 MOBILE — DESCRIPTION BLOCK
        ----------------------------------------------------- */}
        <div className="md:hidden bg-white rounded-2xl shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{product.description}</p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Key Features</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {product.keyFeatures.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-6 mb-2">Nutrition</h2>
          <div className="space-y-1">
            {product.nutrition.map((n, i) => (
              <p key={i}>
                <b>{n.label}:</b> {n.value}
              </p>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2">Manufacturer</h2>
          <p>{product.manufacturer.name}</p>
          <p>{product.manufacturer.address}</p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Supplier</h2>
          <p>{product.supplier.name}</p>
          <p>{product.supplier.address}</p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Seller</h2>
          <p>{product.seller.name}</p>
          <p>{product.seller.address}</p>
          <p>
            <b>FSSAI:</b> {product.seller.fssai}
          </p>
        </div>
      </div>
    </div>
  );
}
