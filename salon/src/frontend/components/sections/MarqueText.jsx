// src/components/MarqueeBar.jsx

import React from "react";
import { FaCircle } from "react-icons/fa"; // Using a simple icon for the bullet

// You can change these text items easily
const marqueeItems = [
  "Money back guarantee for 1 month",
  "Free Delivery order up to $299.99",
  "Same day delivery under cash on delivery",
  "Up to 20% off on everyday",
  "FREE SHIPPING AND RETURNS",
];

/**
 * This renders a single copy of the list.
 * We use 'flex-shrink-0' to prevent it from shrinking.
 */
const MarqueeList = () => (
  <ul className="flex flex-shrink-0">
    {marqueeItems.map((item, index) => (
      <li
        key={index}
        className="flex items-center whitespace-nowrap mx-6 lg:mx-8"
      >
        {/* Using an icon for the bullet point */}
        <FaCircle className="h-2 w-2 text-white/50 mr-3 flex-shrink-0" />
        <span className="font-medium text-sm lg:text-base">{item}</span>
      </li>
    ))}
  </ul>
);

/**
 * The main MarqueeBar component
 */
const MarqueeBar = () => {
  return (
    // 1. The main container. 'bg-green-800' is a guess for your site's 'color-accent-1'
    // 'overflow-hidden' is ESSENTIAL to hide the scrolling content
    <div className="bg-green-800 text-white py-4 overflow-hidden">
      {/* 2. The scrolling track. We apply the 'animate-marquee' class here. */}
      <div className="flex animate-marquee">
        {/* 3. We render the list... */}
        <MarqueeList />

        {/* 4. ...and we render it a second time for the seamless loop. */}
        <MarqueeList />
      </div>
    </div>
  );
};

export default MarqueeBar;
