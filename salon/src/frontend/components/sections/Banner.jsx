import React from "react";
import BannerCard from "../common/BannerCard"; // Import the card component

const BannerSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pharmacy Banner */}
          <BannerCard
            backgroundColor="#10B981" // A shade of green matching your image
            imageUrl="" // No specific image for this background color, content is clear
            title="Pharmacy at your doorstep!"
            description="Cough syrups, pain relief sprays & more"
            linkText="Order Now"
            linkUrl="/pharmacy"
            isLightText={true}
          />

          {/* Pet Care Banner */}
          <BannerCard
            backgroundColor="#FACC15" // A shade of yellow matching your image
            imageUrl="" // No specific image for this background color, content is clear
            title="Pet Care supplies in minutes"
            description="Food, treats, toys & more"
            linkText="Order Now"
            linkUrl="/pet-care"
            isLightText={false} // Text is dark because the background is light yellow
          />

          {/* Diaper Run Banner */}
          <BannerCard
            backgroundColor="#BFDBFE" // A very light blue matching your image
            imageUrl="/images/baby_diaper_run.jpg" // Assuming you have an image for this
            title="No time for a diaper run?"
            description="Get baby care essentials in minutes"
            linkText="Order Now"
            linkUrl="/baby-care"
            isLightText={false} // Text is dark because the background is light blue
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
