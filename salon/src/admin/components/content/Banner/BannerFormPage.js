"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const BannerFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    banner_type: "",
    banner_image: null, // preview
    rawImage: null, // actual file
    link_url: "",
    status: false,
  });

  /* ================= FETCH (EDIT) ================= */
  useEffect(() => {
    if (!isEditing) return;

    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/admin/banners/${id}`)
      .then((res) => {
        const b = res.data.data;

        setFormData({
          banner_type: b.banner_type,
          banner_image: b.background_image_url, // backend full url
          rawImage: null,
          link_url: b.link_url || "",
          status: Boolean(b.status),
        });
      })
      .catch(() => toast.error("❌ Failed to load banner"))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("❌ Image must be under 2MB");
      return;
    }

    setFormData((p) => ({
      ...p,
      banner_image: URL.createObjectURL(file),
      rawImage: file,
    }));
  };

  const removeImage = () => {
    setFormData((p) => ({
      ...p,
      banner_image: null,
      rawImage: null,
    }));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!formData.banner_type) {
      toast.error("❌ Banner position required");
      return false;
    }

    if (!isEditing && !formData.rawImage) {
      toast.error("❌ Banner image required");
      return false;
    }

    if (formData.link_url) {
      try {
        new URL(formData.link_url);
      } catch {
        toast.error("❌ Invalid URL");
        return false;
      }
    }

    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const data = new FormData();
    data.append("banner_type", formData.banner_type);
    data.append("link_url", formData.link_url);
    data.append("status", formData.status ? 1 : 0);

    if (formData.rawImage) {
      data.append("background_image", formData.rawImage);
    }

    try {
      const url = isEditing
        ? `http://127.0.0.1:8000/api/admin/banners/${id}?_method=PUT`
        : "http://127.0.0.1:8000/api/admin/banners";

      await axios.post(url, data);

      Swal.fire({
        icon: "success",
        title: isEditing
          ? "Banner updated successfully!"
          : "Banner created successfully!",
        confirmButtonColor: "#dc2626",
      }).then(() => navigate("/admin/banner"));
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((e) => toast.error(e));
      } else {
        toast.error("❌ Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Banner" : "Add Banner"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Position */}
        <div>
          <label className="text-sm font-medium">Banner Position</label>
          <select
            name="banner_type"
            value={formData.banner_type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Select Position --</option>
            <option value="home">Home</option>
            <option value="offer">Offer</option>
            <option value="popup">Popup</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="text-sm font-medium">Banner Image</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />

          {formData.banner_image && (
            <div className="relative mt-2">
              <img
                src={formData.background_image}
                className="w-full h-72 object-cover rounded"
                alt="Preview"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* URL */}
        <div>
          <label className="text-sm font-medium">Target URL</label>
          <Input
            name="link_url"
            value={formData.link_url}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Active</label>

          <button
            type="button"
            onClick={() =>
              setFormData((p) => ({
                ...p,
                status: !p.status,
              }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition
      ${formData.status ? "bg-green-500" : "bg-gray-300"}
    `}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition
        ${formData.status ? "translate-x-6" : "translate-x-1"}
      `}
            />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/banner")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={loading} className="bg-red-600">
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Banner"
              : "Create Banner"}
          </Button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default BannerFormPage;
