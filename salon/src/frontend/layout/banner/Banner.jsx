import React from "react";

export default function Banner() {
  return (
    <div className="w-full">
      <img
        src="/gallery/banner2.jpg" // 👉 apna banner image path
        alt="Banner"
        className=" object-cover"
      />
    </div>
  );
}
