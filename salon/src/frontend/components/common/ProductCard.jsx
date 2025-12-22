// src/components/ProductCard.jsx
import React from "react";
import { FiClock } from "react-icons/fi"; // You'll need to install react-icons: npm install react-icons

const ProductCard = ({ image, name, deliveryTime, size, price }) => {
  return (
    // Card Wrapper: flex-shrink-0 is essential
    <div className="border border-gray-200 rounded-lg p-4 w-40 md:w-48 flex-shrink-0 flex flex-col">
      {/* Image */}
      <div className="h-32 flex items-center justify-center mb-2">
        <img src={image} alt={name} className="max-h-full object-contain" />
      </div>

      {/* Delivery Time */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
        <FiClock />
        <span>{deliveryTime}</span>
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-sm text-gray-800 h-10 mb-1">{name}</h3>

      {/* Size */}
      <p className="text-sm text-gray-500 mb-4 flex-grow">{size}</p>

      {/* Bottom Row: Price + Add Button */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-gray-800">
          <span className="text-sm">₹</span>
          {price}
        </div>
        <button className="border-2 bg-[#FF9C00] text-white rounded-lg px-4 py-1 text-sm font-bold hover:bg-white hover:text-[#017D03] transition-colors">
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
