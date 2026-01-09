import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import RichTextEditor from "../../../components/common/RichTextEditor";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const EditParentCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [headCategories, setHeadCategories] = useState([]);
  const [headCategoryId, setHeadCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch categories + existing subcategory
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          fetch("http://localhost:8000/api/admin/categories"),
          fetch(`http://localhost:8000/api/admin/subcategories/${id}`),
        ]);

        const catData = await catRes.json();
        const subData = await subRes.json();

        setHeadCategories(catData.data || []);

        setHeadCategoryId(String(subData.category_id));
        setName(subData.name || "");
        setSlug(subData.slug || "");
        setDescription(subData.description || "");
        setActive(Boolean(subData.active));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load category data");
      }
    };

    fetchData();
  }, [id]);

  // 🔹 Auto slug
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!headCategoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      toast.error("Name should only contain letters and spaces");
      return;
    }

    const form = e.target;
    const selectedOption = form.headCategory.selectedOptions[0];

    const payload = {
      category_id: Number(headCategoryId),
      category_name: selectedOption.dataset.name,
      name,
      slug,
      description,
      active,
    };

    try {
      setLoading(true);

      Swal.fire({
        title: "Updating Category...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch(
        `http://localhost:8000/api/admin/subcategories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);

      Swal.close();
      toast.success("Category updated successfully!");
      setTimeout(() => navigate("/admin/subcategory"), 1200);
    } catch (err) {
      Swal.close();
      toast.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-lg border p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Edit SubCategory</h1>

      <form onSubmit={handleSubmit} className="space-y-6 border-t p-6">
        {/* Category */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="sm:w-40 font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="headCategory"
            value={headCategoryId}
            onChange={(e) => setHeadCategoryId(e.target.value)}
            className="flex-1 border rounded-md p-2 text-black"
          >
            <option value="">Select Category</option>
            {headCategories.map((h) => (
              <option key={h.id} value={h.id} data-name={h.name}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="sm:w-40 font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 text-black"
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="sm:w-40 font-medium">Slug</label>
          <Input value={slug} readOnly className="flex-1 bg-gray-100" />
        </div>

        {/* Description */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="sm:w-40 font-medium pt-2">Description</label>
          <div className="flex-1">
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-3">
          <span className="font-medium">Status</span>

          <label className="relative inline-flex cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <div
              className={`
                w-9 h-5 rounded-full transition
                ${active ? "bg-blue-600" : "bg-red-600"}
                after:content-['']
                after:absolute after:top-[2px] after:left-[2px]
                after:h-4 after:w-4 after:bg-white after:rounded-full
                after:transition-all
                ${active ? "after:translate-x-4" : ""}
              `}
            />
          </label>

          <span className="text-sm font-medium">
            {active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default EditParentCategory;
