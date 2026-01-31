import WhyTrustUs from "../layout/chooseus/chooseus";
import FeaturesSection from "../layout/Featurebar/Feature";
import LocationsSection from "../layout/location/location";
import PromoSection from "../layout/offer/Offerbanner";
import Bannertest from "../layout/offer/practice";
import ServicesSection from "../layout/services/Services";
import LuxuryTestimonials from "../layout/testimonials/Testimonials";
import SparkleCanvas from "../components/common/effect/SparkleCanvas";
import Banner from "../layout/banner/Banner";

export default function Home() {
  return (
    <>
      {/* <FeaturesSection />
      <Banner />
      <ServicesSection />
      <PromoSection />
      <LocationsSection />
      <WhyTrustUs />
      <LuxuryTestimonials /> */}
      <div className="relative overflow-hidden">
        {/* ✨ Glitter Sparkle Effect */}
        {/* <SparkleCanvas /> */}
        {/* Home Sections */}
        <FeaturesSection />
        <Banner />
        <ServicesSection />
        <PromoSection />
        <LocationsSection />
        <WhyTrustUs />
        <LuxuryTestimonials />
      </div>
    </>
  );
}
