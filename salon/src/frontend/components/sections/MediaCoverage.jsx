import React from "react";

const mediaItems = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/AII92-4NZw4",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/hJjj1DiuB_k",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/DytbnyFh-II",
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/embed/_CRgQGGqQtk",
  },
];

const MediaCoverage = () => {
  return (
    <section className="py-10 px-8 sm:px-11 lg:px-36">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-black dark:text-white">
        Our Media Coverage
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="w-full aspect-[9/16] flex justify-center mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <iframe
              src={item.videoUrl}
              title={`Media Video ${item.id}`}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full object-cover rounded-2xl"
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaCoverage;
