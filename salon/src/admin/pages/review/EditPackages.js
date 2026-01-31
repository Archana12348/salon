import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/ui/Button";
import "react-toastify/dist/ReactToastify.css";

export default function EditFabric() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [is_active, setIsActive] = useState("true");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = parseInt(searchParams.get("per_page") || "1", 10);
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Fetch Packages data
  useEffect(() => {
    fetch(
      `https://jumeirah.premierwebtechservices.com/backend/api/admin/packages/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}` // Uncomment if token is needed
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const fabric = data.data;

        setName(fabric.name || "");
        setSlug(fabric.slug || "");
        setIsActive(fabric.status?.toString() || "true"); // Ensure it’s "true" or "false"
      })
      .catch((err) => {
        console.error("Error loading packages:", err);
        toast.error("Failed to load packages details ❌");
      });
  }, [id]);

  // Auto-update slug when name changes
  useEffect(() => {
    setSlug(generateSlug(name));
  }, [name]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Prepare the updated packages object
    const updatedFabric = {
      name,
      slug,
      active: is_active === "true" ? 1 : 0, // Convert to 1 for true, 0 for false
    };

    // Make the PUT request to update the packages
    fetch(
      `https://jumeirah.premierwebtechservices.com/backend/api/admin/packages/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}` // Uncomment if token is needed
        },
        body: JSON.stringify(updatedFabric),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Packages updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate(`/admin/packages`); // Navigate back to the packages list after successful update
        }, 2200);
      })
      .catch((err) => {
        console.error("Error updating packages:", err);
        toast.error("Failed to update packages ❌", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-50 shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 ">Edit packages</h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Fabric Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Packages Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            readOnly
            value={slug}
            onChange={(e) => setSlug(generateSlug(e.target.value))}
            required
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status (is_active) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            value={is_active} // Use is_active here
            onChange={(e) => setIsActive(e.target.value)} // Set is_active
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
          Update packages
        </Button>
      </form>

      <ToastContainer />
    </div>
  );
}
