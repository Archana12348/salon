import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import RichTextEditor from "../../../components/common/RichTextEditor";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2"; // ✅ Added SweetAlert2
import "react-toastify/dist/ReactToastify.css";

const AddParentCategory = () => {
  const navigate = useNavigate();
  const [headCategories, setHeadCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(true);

  // ✅ Fetch head categories from API on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/admin/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch head categories");
        }
        return res.json();
      })
      .then((data) => {
        setHeadCategories(data.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to load head categories");
      });
  }, []);

  // ✅ Generate slug from name input
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  }, [name]);

  // ✅ Handle form submit with API call
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get token from localStorage
    const token = localStorage.getItem("token");

    // ✅ Validate name
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error("Name should only contain letters and spaces!");
      return;
    }

    const form = e.target;
    const selectedOption = form.headCategory.selectedOptions[0];
    const payload = {
      category_id: form.headCategory.value,
      category_name: selectedOption.dataset.name,
      name,
      slug,
      description,
      active,
    };

    // ✅ Show SweetAlert loader
    Swal.fire({
      title: "Saving Category...",
      text: "Please wait while we save your category.",
      allowOutsideClick: false,
      background: "#ffff",
      color: "#dc2626",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch("http://localhost:8000/api/admin/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // ✅ Add token if available
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            const message =
              data?.message?.split(".")[0] || "Failed to add parent category";
            throw new Error(message);
          });
        }
        return res.json();
      })
      .then((data) => {
        Swal.close(); // ✅ Close loader

        console.log(data);
        debugger;
        toast.success("Parent category added successfully!");
        setTimeout(() => {
          navigate("/admin/subcategory");
        }, 1500);
      })
      .catch((error) => {
        Swal.close(); // ✅ Close loader on error
        console.error("Error:", error);
        toast.error(
          error.message || "An error occurred while adding the parent category."
        );
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 dark:text-white">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Add Parent Category</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 dark:bg-gray-800 rounded-lg p-6"
      >
        {/* Head Category */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label
            htmlFor="headCategory"
            className="sm:w-40 font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="headCategory"
            name="headCategory"
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
          >
            <option value="">Select a Head Category</option>
            {headCategories.map((head) => (
              <option key={head.id} value={head.id} data-name={head.name}>
                {head.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label
            htmlFor="parentCategoryName"
            className="sm:w-40 font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <Input
            id="parentCategoryName"
            name="parentCategoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 text-black"
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="slug" className="sm:w-40 font-medium">
            Slug
          </label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            readOnly
            className="flex-1 text-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="description" className="sm:w-40 font-medium pt-2">
            Description
          </label>
          <div className="flex-1 text-black">
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
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
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddParentCategory;
