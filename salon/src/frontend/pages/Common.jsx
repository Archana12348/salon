import { useEffect, useState } from "react";

const API_URL = "http://your-backend-url/api/page/about-us";

export default function AboutUs() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.success) {
          setPage(data.data);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!page) {
    return <div className="text-center text-red-500 mt-10">Page not found</div>;
  }

  return (
    <section className="bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[300px] flex items-center justify-center text-white"
        style={{
          backgroundImage: page.background_image
            ? `url(${page.background_image})`
            : "linear-gradient(to right, #1f2937, #111827)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 absolute inset-0"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold">
          {page.title}
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </section>
  );
}
