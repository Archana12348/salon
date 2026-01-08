import React from "react";

export default function PageBanner({
  title,
  subtitle,
  bgImage,
  height = "55vh",
}) {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        height,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-wide">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-gray-200">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
