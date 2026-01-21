import React, { useEffect, useState } from "react";

const API_URL =
  "https://jumeirah.premierwebtechservices.com/backend/api/site/banners/latest";

export default function Banner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.success) {
          setBanner(data.data);
        }
      } catch (error) {
        console.error("Banner fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading) {
    return null; // ya loader laga sakti ho
  }

  if (!banner?.background_image_url) {
    return null;
  }

  return (
    <div className="w-full">
      <img
        src={banner.background_image_url}
        alt="Banner"
        className="w-full h-[350px] md:h-[500px] object-cover"
      />
    </div>
  );
}
