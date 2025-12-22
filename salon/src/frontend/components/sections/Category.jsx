import React from "react";

// --- 1. The Data for all 20 Categories ---
// This array holds all the information.
// IMPORTANT: You MUST replace all 'imageSrc' paths with your own.
const categoryData = [
  // Top Row
  {
    name: "Paan Corner",
    imageSrc: "/product/category_2_1.png",
    link: "/category/paan",
  },
  {
    name: "Dairy, Bread & Eggs",
    imageSrc: "/product/category_2_1.png",
    link: "/category/dairy",
  },
  {
    name: "Fruits & Vegetables",
    imageSrc: "/product/category_2_1.png",
    link: "/category/vegetables",
  },
  {
    name: "Cold Drinks & Juices",
    imageSrc: "/product/category_2_1.png",
    link: "/category/drinks",
  },
  {
    name: "Snacks & Munchies",
    imageSrc: "/product/category_2_1.png",
    link: "/category/snacks",
  },
  {
    name: "Breakfast & Instant Food",
    imageSrc: "/product/category_2_1.png",
    link: "/category/breakfast",
  },
  {
    name: "Sweet Tooth",
    imageSrc: "/product/category_2_1.png",
    link: "/category/sweets",
  },
  {
    name: "Bakery & Biscuits",
    imageSrc: "/product/category_2_1.png",
    link: "/category/bakery",
  },
  {
    name: "Tea, Coffee & Health Drink",
    imageSrc: "/product/category_2_1.png",
    link: "/category/tea-coffee",
  },
  {
    name: "Atta, Rice & Dal",
    imageSrc: "/product/category_2_1.png",
    link: "/category/staples",
  },
  // Bottom Row
  {
    name: "Masala, Oil & More",
    imageSrc: "/product/category_2_1.png",
    link: "/category/masala-oil",
  },
  {
    name: "Sauces & Spreads",
    imageSrc: "/product/category_2_1.png",
    link: "/category/sauces",
  },
  {
    name: "Chicken, Meat & Fish",
    imageSrc: "/product/category_2_1.png",
    link: "/category/meat",
  },
  {
    name: "Organic & Healthy Living",
    imageSrc: "/img/categories/14_organic.png",
    link: "/category/organic",
  },
  {
    name: "Baby Care",
    imageSrc: "/img/categories/15_baby.png",
    link: "/category/baby-care",
  },
  {
    name: "Pharma & Wellness",
    imageSrc: "/img/categories/16_pharma.png",
    link: "/category/pharma",
  },
  {
    name: "Cleaning Essentials",
    imageSrc: "/img/categories/17_cleaning.png",
    link: "/category/cleaning",
  },
  {
    name: "Home & Office",
    imageSrc: "/img/categories/18_home.png",
    link: "/category/home-office",
  },
  {
    name: "Personal Care",
    imageSrc: "/img/categories/19_personal.png",
    link: "/category/personal-care",
  },
  {
    name: "Pet Care",
    imageSrc: "/img/categories/20_pet.png",
    link: "/category/pet-care",
  },
];

// --- 2. The Reusable Card Component ---
// This component displays a single category.
const CategoryCard = ({ name, imageSrc, link }) => {
  return (
    <a
      href={link}
      className="block p-2 text-center transition-shadow duration-200 ease-in-out hover:shadow-xl rounded-xl"
    >
      {/* Image Container */}
      <div className="flex items-center justify-center h-28 md:h-32 p-4 bg-gray-50 rounded-lg">
        <img src={imageSrc} alt={name} className="h-full object-contain" />
      </div>
      {/* Text Label */}
      <p className="mt-2 text-sm font-semibold text-gray-800 min-h-[40px]">
        {name}
      </p>
    </a>
  );
};

// --- 3. The Main Grid Component ---
// This component lays out all the cards in a responsive grid.
const CategoryGrid = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Optional Title */}
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>

        {/* Responsive Grid */}
        <div
          className="grid 
          grid-cols-3 
          sm:grid-cols-4 
          md:grid-cols-5 
          lg:grid-cols-8 
          xl:grid-cols-10 
          gap-4"
        >
          {categoryData.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              imageSrc={category.imageSrc}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
