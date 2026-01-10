"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const AddBannerPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    position: "",
    banner_image: null,
    rawImage: null,
    target_url: "",
    is_active: false,
  });

  const [loading, setLoading] = useState(false);

  // Handle inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload + preview + size validation
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      toast.error("❌ Image size must be less than 2MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      banner_image: URL.createObjectURL(file),
      rawImage: file,
    }));
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      banner_image: null,
      rawImage: null,
    }));
  };

  // Validation
  const validateForm = () => {
    if (!formData.position) {
      toast.error("❌ Banner position is required");
      return false;
    }

    if (!formData.rawImage) {
      toast.error("❌ Banner image is required");
      return false;
    }

    return true;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    data.append("banner_type", formData.position);
    data.append("link_url", formData.target_url);
    data.append("status", formData.is_active ? 1 : 0);
    data.append("background_image", formData.rawImage);

    try {
      await axios.post(
        "https://jumeirah.premierwebtechservices.com/backend/api/admin/banners",
        data
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "✅ Banner created successfully!",
        confirmButtonColor: "#d33",
      }).then(() => navigate("/admin/banner"));
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors) {
        Object.values(errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error("❌ Failed to create banner.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto border rounded-xl bg-slate-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Add Banner</h1>

      <form onSubmit={handleSubmit} className="space-y-6 border-t pt-4">
        {/* Banner Position */}
        <div>
          <label className="text-xl font-medium">
            Banner Position <span className="text-red-500">*</span>
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Select Position --</option>
            <option value="home">Home</option>
            <option value="offer">Offer</option>
            <option value="popup">Popup</option>
          </select>
        </div>

        {/* Banner Image */}
        <div>
          <label className="text-xl font-medium">
            Banner Image <span className="text-red-500">*</span>
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />

          {formData.banner_image && (
            <div className="relative mt-2">
              <img
                src={formData.banner_image}
                alt="Preview"
                className="w-full h-72 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Target URL */}
        <div>
          <label className="text-xl font-medium">Target URL</label>
          <Input
            name="target_url"
            value={formData.target_url}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className="w-full"
          />
        </div>

        {/* Is Active Toggle */}
        <div className="flex items-center gap-3">
          <label className="text-xl font-medium">
            Status<span className="text-red-500">*</span>
          </label>

          <button
            type="button"
            onClick={() =>
              setFormData((p) => ({
                ...p,
                is_active: !p.is_active,
              }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition
      ${formData.is_active ? "bg-green-500" : "bg-gray-300"}
    `}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition
        ${formData.is_active ? "translate-x-6" : "translate-x-1"}
      `}
            />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/content")}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create Banner"}
          </Button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddBannerPage;
