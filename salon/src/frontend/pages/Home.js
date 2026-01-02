import WhyTrustUs from "../layout/chooseus/chooseus";
import FeaturesSection from "../layout/Featurebar/Feature";
import LocationsSection from "../layout/location/location";
import PromoSection from "../layout/offer/Offerbanner";
import Bannertest from "../layout/offer/practice";
import ServicesSection from "../layout/services/Services";
import LuxuryTestimonials from "../layout/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <FeaturesSection />
      <ServicesSection />
      <PromoSection />
      <LocationsSection />
      <WhyTrustUs />
      <LuxuryTestimonials />
    </>
  );
}
