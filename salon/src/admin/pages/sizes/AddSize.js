import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RichTextEditor from "../../components/common/RichTextEditor";

export default function AddPage() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(true); // true = active, false = inactive

  const navigate = useNavigate();

  // Auto-generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(generatedSlug);
  }, [title]);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackgroundImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", status ? 1 : 0);

    if (backgroundImage) {
      formData.append("background_image", backgroundImage);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/pages", {
        method: "POST",
        body: formData, // ❗ no Content-Type
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Page created successfully ✅");
        setTimeout(() => navigate("/pages"), 2000);
      } else {
        toast.error(data.message || "Failed ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">Add Page</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page Title"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="page-slug"
            required
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1">
            Slug is auto-generated from title.
          </p>
        </div>

        {/* Rich Text */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Content <span className="text-red-500">*</span>
          </label>
          <div className="border rounded-lg">
            <RichTextEditor
              value={content}
              onChange={setContent}
              style={{ minHeight: "300px" }} // Increase height
            />
          </div>
        </div>

        {/* Status Toggle */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setStatus(true)}
              className={`px-4 py-2 rounded-lg font-medium ${
                status ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setStatus(false)}
              className={`px-4 py-2 rounded-lg font-medium ${
                !status ? "bg-red-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Background Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-64 h-40 object-cover border rounded"
            />
          )}
        </div>

        <button className="bg-red-600 text-white px-6 py-2 rounded">
          Save Page
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
