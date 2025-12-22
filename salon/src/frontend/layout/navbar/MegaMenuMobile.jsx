import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const MegaMenuMobile = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const sections = [
    {
      title: "Fresh Fruits",
      items: ["Apples", "Bananas", "Mangoes", "Pineapples", "Pear"],
    },
    {
      title: "Vegetables",
      items: ["Broccoli", "Cauliflower", "Potatoes", "Tomato"],
    },
    {
      title: "Bakery",
      items: ["Cakes and Pies"],
    },
  ];

  return (
    <div
      className="text-white h-[calc(100vh-200px)] overflow-y-auto pr-2 space-y-2"
      style={{ scrollbarWidth: "thin" }}
    >
      {sections.map((section, index) => (
        <div
          key={section.title}
          className="border-b border-white/20 last:border-none pb-3"
        >
          <button
            onClick={() =>
              setOpenCategory(openCategory === index ? null : index)
            }
            className="w-full flex justify-between items-center text-left font-semibold text-base py-2"
          >
            {section.title}
            <FaChevronDown
              className={`transition-transform duration-300 ${
                openCategory === index ? "rotate-180 text-[#FF9C00]" : ""
              }`}
            />
          </button>

          {openCategory === index && (
            <ul className="pl-4 mt-1 space-y-1 text-sm">
              {section.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block py-1 hover:text-[#FF9C00] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MegaMenuMobile;
