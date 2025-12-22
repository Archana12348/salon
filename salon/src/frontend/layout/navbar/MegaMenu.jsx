// 📁 src/components/MegaMenu.jsx
import React from "react";

const MegaMenu = () => {
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 bg-white text-[#017D03] shadow-xl border border-gray-100 py-5 px-16 z-40 rounded-2xl w-[80%]">
      <div className="grid grid-cols-3 gap-8">
        {/* Shop by Category */}
        <div>
          <h3 className="text-gray-500 font-semibold  mb-4 uppercase text-sm tracking-wide">
            Fresh Fruits
          </h3>
          <ul className="space-y-1">
            {["Apples", "Bananas", "Mangoes", "Pineapples", "Pear"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block hover:text-[#FF9C00] transition-colors duration-200 text-base"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Shop by Sport */}
        <div>
          <h3 className="text-gray-500 font-semibold mb-4 uppercase text-sm tracking-wide">
            Vegetables
          </h3>
          <ul className="space-y-1">
            {["Broccoli", "Cauliflower", "Potatoes", "Tomato"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block hover:text-[#FF9C00] transition-colors duration-200 text-base"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Accessories */}
        <div>
          <h3 className="text-gray-500 font-semibold mb-4 uppercase text-sm tracking-wide">
            Bakery
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="block hover:text-[#FF9C00] transition-colors duration-200 text-base"
              >
                Cakes and Pies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
