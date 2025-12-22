import React from "react";

// A single feature item - This makes the main component cleaner
const FeatureItem = ({ icon, title, text }) => (
  <div className="feature-list flex items-center gap-4 p-4 w-full lg:w-auto">
    <div className="box-icon flex-shrink-0">
      {/* Image paths are updated for your 'public' folder */}
      <img src={`/icon/${icon}`} alt={title} className="h-10 w-10" />
    </div>
    <div className="media-body">
      <h3 className="box-title font-semibold text-gray-800">{title}</h3>
      <p className="box-text text-sm text-gray-600">{text}</p>
    </div>
  </div>
);

// The divider line
const FeatureDivider = () => (
  <div className="feature-list-line hidden lg:block h-16 w-px bg-gray-200" />
);

// The main component
const FeatureBar = () => {
  return (
    <section className="mt-4 py-4">
      <div className="container mx-auto px-4">
        {/* This wrapper stacks items on mobile (flex-col) and makes them
          a horizontal row on large screens (lg:flex-row).
          We add a background, shadow, and rounded corners to make it a nice "card".
        */}
        <div className="feature-list-wrap flex flex-col lg:flex-row justify-between items-center bg-white  shadow-md rounded-lg">
          <FeatureItem
            icon="feature_list_1.svg"
            title="Return Policy"
            text="Money back guarantee"
          />

          <FeatureDivider />

          <FeatureItem
            icon="feature_list_2.svg"
            title="Free Shipping"
            text="On all orders over $50.00"
          />

          <FeatureDivider />

          <FeatureItem
            icon="feature_list_3.svg"
            title="Store locator"
            text="Find your nearest store"
          />

          <FeatureDivider />

          <FeatureItem
            icon="feature_list_4.svg"
            title="24/7 Support"
            text="Contact us 24 hours a day"
          />

          {/* The original HTML had an extra divider at the end, 
              which might be a mistake. I've left it out. 
              If you want it, just uncomment the line below. */}
          {/* <FeatureDivider /> */}
        </div>
      </div>
    </section>
  );
};

export default FeatureBar;
