import FeatureBar from "../components/sections/FeatureBar";
import MarqueText from "../components/sections/MarqueText";
import BannerSection from "../components/sections/Banner";
import ImageCarousel from "../components/sections/BannerScreen";
import CategoryGrid from "../components/sections/Category";
import ProductCarousel from "../components/sections/ProductCarousel";
import MediaCoverage from "../components/sections/MediaCoverage";
import WeeklyDeals from "../components/sections/WeeklyDeals";
export default function Home() {
  return (
    <>
      {/* <h1 className="text-3xl font-bold">Welcome to Grocery Store 🛒</h1> */}
      <ImageCarousel />
      <BannerSection />
      <FeatureBar />

      <ProductCarousel
        title="Dairy, Bread & Eggs"
        seeAllLink="/category/dairy"
      />

      {/* You can re-use it for other categories! */}
      <ProductCarousel
        title="Fruits & Vegetables"
        seeAllLink="/category/fruits"
      />
      <MarqueText />
      <WeeklyDeals />
      <MediaCoverage />
    </>
  );
}
