import React from "react";

const BannerCard = ({
  backgroundColor,
  imageUrl,
  title,
  description,
  linkText,
  linkUrl = "#", // Default link to '#' if not provided
  isLightText = true, // Prop to control text color for dark/light backgrounds
}) => {
  // Determine text color based on isLightText prop
  const textColorClass = isLightText ? "text-white" : "text-gray-800";

  return (
    <div
      className={`relative p-6 rounded-2xl overflow-hidden flex flex-col justify-between h-64 shadow-lg`}
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Content Overlay - using a semi-transparent gradient for readability */}
      <div
        className={`absolute inset-0 z-10 
          ${
            isLightText
              ? "bg-gradient-to-t from-black/20 to-transparent"
              : "bg-gradient-to-t from-white/20 to-transparent"
          }
        `}
      ></div>

      {/* Text Content */}
      <div className={`relative z-20 flex flex-col h-full ${textColorClass}`}>
        <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base mb-4 flex-grow">{description}</p>
        <a
          href={linkUrl}
          className={`w-fit px-5 py-2 rounded-full font-semibold transition-colors
            ${
              isLightText
                ? "bg-white text-green-600 hover:bg-gray-100"
                : "bg-green-600 text-white hover:bg-green-700"
            }
          `}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default BannerCard;
