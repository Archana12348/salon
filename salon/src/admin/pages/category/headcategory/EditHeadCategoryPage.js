import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // ✅ Added missing import
import RichTextEditor from "../../../components/common/RichTextEditor"; // adjust path
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { ToastContainer } from "react-toastify";

const API_BASE =
  "https://jumeirah.premierwebtechservices.com/backend/api/admin/categories";

export default function EditHeadCategoryPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loader state added
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [photo, setPhoto] = useState(null); // new image
  const [preview, setPreview] = useState(null); // preview (new)
  const [oldImage, setOldImage] = useState(null); // backend image

  // Load existing category data
  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        debugger;

        setName(data.name || "");
        setSlug(data.slug || "");
        setDescription(data.description || "");
        setActive(data.active ? true : false);
        // ✅ OLD IMAGE
        if (data.photo) {
          setOldImage(
            `https://jumeirah.premierwebtechservices.com/backend/storage/${data.photo}`,
          );
        }
      })
      .catch((err) => {
        toast.error("Failed to load category");
        console.error(err.response?.data || err.message);
      });
  }, [id, token]);

  // Auto-generate slug from name, but allow manual edits as well
  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    } else {
      setSlug("");
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      Swal.fire({
        title: "Updating Category...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("active", active ? 1 : 0);

      // ✅ image sirf tab bhejo jab new select ho
      if (photo) {
        formData.append("photo", photo);
      }

      // ✅ console print
      console.log("===== UPDATE FORM DATA =====");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        `${API_BASE}/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("===== UPDATE RESPONSE =====", response.data);

      Swal.close();
      setLoading(false);
      toast.success("Category updated successfully!");
      setTimeout(() => navigate("/admin/category"), 800);
    } catch (error) {
      Swal.close();
      setLoading(false);
      toast.error("Failed to update category");
      console.error(error.response?.data || error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file)); // new preview
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto  border p-6 rounded-lg bg-white dark:bg-gray-900 shadow">
        <h1 className="text-2xl font-bold mb-5">Edit Main Category</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name<span className="text-red-500 font-semibold">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block mb-1 font-medium">
              Slug<span className="text-red-500 font-semibold">*</span>
            </label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Auto-generated slug"
              readOnly
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
          {/* Category Image */}
          <div>
            <label className="block mb-1 font-medium">Category Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm"
            />

            {/* NEW IMAGE PREVIEW */}
            {preview && (
              <div className="mt-3">
                <p className="text-sm text-green-600 mb-1">New Image Preview</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded border"
                />
              </div>
            )}

            {/* OLD IMAGE */}
            {!preview && oldImage && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-1">Current Image</p>
                <img
                  src={oldImage}
                  alt="Old"
                  className="h-32 w-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Active / Inactive Toggle */}
          {/* Active / Inactive Toggle */}
          <div className="flex items-center gap-3 mt-4">
            <label className="font-medium">
              Status<span className="text-red-500 font-semibold">*</span>
            </label>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />

              <div
                className="
        w-11 h-6 rounded-full transition-colors
        bg-red-600 peer-checked:bg-blue-600
        after:content-['']
        after:absolute after:top-[2px] after:left-[2px]
        after:h-5 after:w-5 after:bg-white after:rounded-full
        after:transition-transform
        peer-checked:after:translate-x-5
      "
              ></div>
            </label>

            <span className="text-sm font-medium">
              {active ? (
                <span className="text-blue-600">Active</span>
              ) : (
                <span className="text-red-600">Inactive</span>
              )}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Category"}
            </Button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
