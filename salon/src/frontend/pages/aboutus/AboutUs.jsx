import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE =
  "https://jumeirah.premierwebtechservices.com/backend/api/site/page";

const AboutUs = () => {
  const { slug } = useParams(); // 👈 get slug from URL
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_BASE}/${slug}`);
        const data = await res.json();
        console.log("data", data);
        if (data.success) {
          setPage(data.data);
        }
      } catch (err) {
        console.error("Failed to load page", err);
      }
    };

    fetchPage();
  }, [slug]);

  return (
    <div
      className="relative min-h-screen overflow-hidden font-[Poppins]"
      style={{
        backgroundImage: page?.background_image
          ? `url(${page.background_image})`
          : "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-5 py-24 text-center">
        <h1
          className="text-5xl mb-6 text-[#e7a509] drop-shadow-[0_0_15px_#956D13]"
          style={{ fontFamily: "var(--font-heading--family)" }}
        >
          {page?.title}
        </h1>

        <div
          className="text-lg leading-8 text-black space-y-5"
          style={{ fontFamily: "var(--font-heading--family)" }}
          dangerouslySetInnerHTML={{ __html: page?.content }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
