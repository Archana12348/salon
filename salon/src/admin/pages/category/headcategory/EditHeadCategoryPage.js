import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // ✅ Added missing import
import RichTextEditor from "../../../components/common/RichTextEditor"; // adjust path
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { ToastContainer } from "react-toastify";

const API_BASE = "http://localhost:8000/api/admin/categories";

export default function EditHeadCategoryPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loader state added
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    const namePattern = /^[A-Za-z\s-]+$/;
    if (!namePattern.test(name.trim())) {
      toast.error(
        "Category name can only contain letters, spaces, and hyphens."
      );
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    if (!slug.trim()) {
      toast.error("Slug cannot be empty.");
      return;
    }

    try {
      setLoading(true); // ✅ Start loader
      Swal.fire({
        title: "Updating Category...",
        text: "Please wait while we update your category.",
        allowOutsideClick: false,
        background: "#ffff",
        color: "#dc2626",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      console.log("active ", active);
      debugger;

      const response = await axios.put(
        `${API_BASE}/${id}`,
        { name, slug, description, active },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      debugger;

      Swal.close(); // ✅ Close loader

      toast.success("Category updated successfully!");
      setLoading(false); // ✅ Stop loader

      setTimeout(() => navigate("/admin/category"), 800);
    } catch (error) {
      Swal.close(); // ✅ Close loader on error
      setLoading(false); // ✅ Stop loader
      toast.error("Failed to update category");
      console.error("PUT error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-gray dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-5 text-white">
          Edit Main Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-medium dark:text-gray-300"
            >
              Name
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
            <label
              htmlFor="slug"
              className="block mb-1 font-medium dark:text-gray-300"
            >
              Slug
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
            <label
              htmlFor="description"
              className="block mb-1 font-medium dark:text-gray-300"
            >
              Description
            </label>
            <RichTextEditor
              value={description}
              initialContent={description}
              onChange={setDescription}
            />
          </div>
          {/* Active / Inactive Toggle */}
          <div className="flex items-center gap-3 pb-1">
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
                  after:absolute after:top-[2px] after:left-[2px]
                  after:h-4 after:w-4 after:rounded-full
                  after:bg-white after:transition-all
                  ${active ? "after:translate-x-4" : ""}
                `}
              />

              <span className="select-none ms-2 text-sm font-medium">
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
