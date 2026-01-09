import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/ui/Button";
import "react-toastify/dist/ReactToastify.css";

export default function AddFabric() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [is_active, setIsActive] = useState("1");
  const navigate = useNavigate();

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  useEffect(() => {
    setSlug(generateSlug(name));
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFabric = {
      name,
      slug,
      active: is_active === "true" ? 1 : 0,
    };

    fetch("http://localhost:8000/api/admin/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newFabric),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        debugger;
        if (data.success) {
          console.log("Response JSON:", data.message);
          toast.success(data.message || "Packages saved successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/admin/packages");
          }, 2200);
        } else {
          console.warn("Server responded with failure:", data.message);
          toast.error(data.message || "Failed to save packages ❌", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.error("Error saving packages:", err);
        toast.error("Something went wrong ❌", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-50 shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 ">Add Packages</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* packages Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Packages Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter packages name"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium  mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            readOnly
            value={slug}
            onChange={(e) => setSlug(generateSlug(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-generated slug"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            value={is_active}
            onChange={(e) => setIsActive(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Save Packages
        </Button>
      </form>

      <ToastContainer />
    </div>
  );
}
