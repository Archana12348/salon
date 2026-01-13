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

const AddSliderPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    target_url: "",
    button_name: "",
    is_active: false,
    background_image: null,
    rawImage: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image upload + preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        background_image: URL.createObjectURL(file),
        rawImage: file,
      }));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      background_image: null,
      rawImage: null,
    }));
  };

  // Validate form
  const validateForm = (isEditing = false) => {
    // Image validation (only required on add)
    if (!isEditing && !formData.rawImage) {
      toast.error("❌ Background image is required.");
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    data.append("button_url", formData.target_url || "");
    data.append("button_name", formData.button_name || "");
    data.append("status", formData.is_active ? 1 : 0);
    if (formData.rawImage) data.append("image", formData.rawImage);

    try {
      const response = await axios.post(
        "https://jumeirah.premierwebtechservices.com/backend/api/admin/sliders",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("API Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "✅ Slider created successfully!",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin/slider"));
    } catch (error) {
      console.error("API Error:", error.response || error);
      toast.error("❌ Failed to create slider.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-50 rounded-xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Add Slider</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Background Image */}
        <div>
          <label className="text-sm font-medium">
            Background Image <span className="text-red-600">*</span>
          </label>
          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              required
              onChange={handleImageUpload}
              className="cursor-pointer w-full"
            />
            {formData.background_image && (
              <div className="relative w-full">
                <img
                  src={formData.background_image}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded border shadow"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Target URL */}
        <div>
          <label className="text-sm font-medium">Target URL</label>
          <Input
            name="target_url"
            value={formData.target_url}
            onChange={handleInputChange}
            placeholder="Enter target URL"
            className="w-full"
          />
        </div>

        {/* Button Name */}
        <div>
          <label className="text-sm font-medium">Button Name</label>
          <Input
            name="button_name"
            value={formData.button_name}
            onChange={handleInputChange}
            placeholder="Enter button name"
            className="w-full"
          />
        </div>

        {/* Active / Inactive Toggle */}
        <div className="flex items-start gap-3 pb-1">
          <span className="font-medium">
            Status <span className="text-red-500">*</span>
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_active: e.target.checked,
                }))
              }
            />

            <div
              className={`
        w-9 h-5 rounded-full transition-colors
        peer-focus:ring-4 peer-focus:ring-blue-200
        ${formData.is_active ? "bg-blue-600" : "bg-red-600"}
        after:content-['']
        after:absolute after:top-[2px] after:left-[2px]
        after:h-4 after:w-4 after:rounded-full
        after:bg-white after:transition-all
        ${formData.is_active ? "after:translate-x-4" : ""}
      `}
            />
          </label>

          <span className="select-none text-sm font-medium">
            {formData.is_active ? (
              <span className="text-blue-600">Active</span>
            ) : (
              <span className="text-red-600">Inactive</span>
            )}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/content")}
            className="w-full sm:w-auto"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Create Slider"
            )}
          </Button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddSliderPage;
