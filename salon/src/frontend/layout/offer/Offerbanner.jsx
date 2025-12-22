import React from "react";

export default function Banner() {
  return (
    <div className="w-full">
      <img
        src="/gallery/offer1.jpeg" // 👉 apna banner image path
        alt="Banner"
        className=" object-cover"
      />
    </div>
  );
}
