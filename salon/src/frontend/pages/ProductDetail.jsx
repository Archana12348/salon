import ProductCarousel from "../components/sections/ProductCarousel";

import ProductPage from "../components/sections/ProductPage";

export default function Home() {
  return (
    <>
      <ProductPage />

      <ProductCarousel
        title="Dairy, Bread & Eggs"
        seeAllLink="/category/dairy"
      />

      {/* You can re-use it for other categories! */}
      <ProductCarousel
        title="Fruits & Vegetables"
        seeAllLink="/category/fruits"
      />
    </>
  );
}
