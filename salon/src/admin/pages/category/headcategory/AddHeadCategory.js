import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import
import RichTextEditor from "../../../components/common/RichTextEditor"; // adjust path
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://localhost:8000/api/admin/categories";

export default function AddHeadCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loader state added
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Auto-generate slug from name
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

    const namePattern = /^[A-Za-z\s-]+$/;
    if (!namePattern.test(name.trim())) {
      toast.error(
        "Category name can only contain letters, spaces, and hyphens."
      );
      return;
    }
    try {
      setLoading(true); // ✅ Fix: Loader state use
      Swal.fire({
        title: "Saving Product...",
        text: "Please wait while we save your product.",
        allowOutsideClick: false,
        background: "#ffff", // 🖤 Black background
        color: "#dc2626", // ❤️ Red text
        didOpen: () => {
          Swal.showLoading();
        },
      });
      console.log("admin", slug, active, name, description);
      debugger;

      const response = await axios.post(
        API_BASE,
        { name, slug, description, active },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.close(); // ✅ Loader Close
      setLoading(false); // ✅ Stop loader
      console.log("API Response:", response.data);

      toast.success("Category added successfully!");
      setTimeout(() => navigate("/admin/category"), 800);
    } catch (error) {
      Swal.close(); // ✅ Close Loader on Error
      setLoading(false); // ✅ Stop loader
      toast.error("Failed to add category");
      console.error("Error Response:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen p-2">
      <div className="max-w-2xl mx-auto  dark:bg-gray-500 p-6 rounded-lg ">
        <h1 className="text-2xl font-bold mb-5 dark:text-white">
          Main Head Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-medium dark:text-white"
            >
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
              className="dark:text-black bg-slate-50"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block mb-1 font-medium dark:text-white"
            >
              Slug
            </label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Auto-generated slug"
              required
              className="dark:text-black"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-1 font-medium dark:text-gray-300"
            >
              Description
            </label>
            <RichTextEditor
              initialContent={description}
              onChange={setDescription}
            />
          </div>

          {/* Active / Inactive Toggle */}
          <div className="flex items-center gap-3 mt-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />

              <div
                className={`
                  relative w-9 h-5 rounded-full transition-colors
                  peer-focus:outline-none peer-focus:ring-4
                  peer-focus:ring-blue-200
                  ${active ? "bg-blue-600" : "bg-red-600"}
                  after:content-['']
                  after:absolute after:top-[2px] after:start-[2px]
                  after:h-4 after:w-4 after:rounded-full
                  after:bg-white after:transition-all
                  ${active ? "after:translate-x-4" : ""}
                `}
              />

              <span className="select-none ms-3 text-sm font-medium">
                {active ? (
                  <span className="text-blue-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              className="dark:text-white"
              type="button"
              variant="outline"
              onClick={() => navigate("/headcategory")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700"
              disabled={loading} // ✅ Disable when loading
            >
              {loading ? "Saving..." : "Add Category"}
            </Button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
