// src/components/ProductCarousel.jsx
import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const dairyProducts = [
  {
    image: "/product/category_2_1.png",
    name: "Verka Standard Fresh Milk",
    deliveryTime: "15 MINS",
    size: "1 ltr",
    price: "63",
  },
  {
    image: "/product/category_2_2.png",
    name: "Amul Gold Full Cream Milk",
    deliveryTime: "15 MINS",
    size: "500 ml",
    price: "35",
  },
  {
    image: "/product/category_2_3.png",
    name: "Amul Shakti Fresh Milk",
    deliveryTime: "15 MINS",
    size: "1 ltr",
    price: "63",
  },
  {
    image: "/product/category_2_4.png",
    name: "Verka Cup Curd",
    deliveryTime: "15 MINS",
    size: "350 g",
    price: "33",
  },
  {
    image: "/product/category_2_5.png",
    name: "Amul Salted Butter",
    deliveryTime: "15 MINS",
    size: "100 g",
    price: "58",
  },
  {
    image: "/product/category_2_6.png",
    name: "Amul Masti Pouch Curd",
    deliveryTime: "15 MINS",
    size: "1 kg",
    price: "77",
  },
  {
    image: "/product/deal_card_1.jpg",
    name: "Verka Dahi",
    deliveryTime: "15 MINS",
    size: "500 ml",
    price: "26",
  },
];

const ProductCarousel = ({ title, seeAllLink = "#" }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Scroll function
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Check scroll positions
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  // Attach scroll listener
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <section className="py-8 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <a
            href={seeAllLink}
            className="text-green-600 font-semibold hover:text-green-700"
          >
            see all
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Scroll Button (only visible when needed) */}
          {canScrollLeft && (
            <button
              onClick={() => scroll(-300)}
              className="absolute top-1/2 -translate-y-1/2 left-0 z-10 
                       bg-white rounded-full h-10 w-10 
                       flex items-center justify-center 
                       shadow-md border border-gray-100 
                       hover:bg-gray-50 transition-transform 
                       -translate-x-1/2"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          )}

          {/* Product List */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 py-4 scroll-smooth hide-scrollbar"
          >
            {dairyProducts.map((product) => (
              <ProductCard
                key={product.name}
                image={product.image}
                name={product.name}
                deliveryTime={product.deliveryTime}
                size={product.size}
                price={product.price}
              />
            ))}
          </div>

          {/* Right Scroll Button (only visible when needed) */}
          {canScrollRight && (
            <button
              onClick={() => scroll(300)}
              className="absolute top-1/2 -translate-y-1/2 right-0 
                       bg-white rounded-full h-10 w-10 
                       flex items-center justify-center 
                       shadow-md border border-gray-100 
                       hover:bg-gray-50 transition-transform 
                       translate-x-1/2"
              aria-label="Scroll right"
            >
              <FiChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* Hide scrollbar globally */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ProductCarousel;
