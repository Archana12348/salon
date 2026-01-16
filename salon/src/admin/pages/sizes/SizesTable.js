import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SizesTable = () => {
  const [sizes, setSizes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // if your API requires auth

  useEffect(() => {
    fetchSizes();
  }, [currentPage, perPage, searchTerm]);

  const fetchSizes = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/pages?page=${currentPage}&perPage=${perPage}&search=${searchTerm}&sortDir=desc`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (data && Array.isArray(data.data)) {
        setSizes(data.data);
        if (data.pagination) {
          setTotalPages(data.pagination.last_page || 1);
          setTotalItems(data.pagination.total || data.data.length);
        } else {
          setTotalPages(1);
          setTotalItems(data.data.length);
        }
      } else {
        setSizes([]);
        setTotalPages(1);
        setTotalItems(0);
      }
    } catch (err) {
      console.error("Error fetching sizes:", err);
      setSizes([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(
          `https://jumeirah.premierwebtechservices.com/backend/api/admin/pages/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchSizes();
        setSelectedIds(selectedIds.filter((sid) => sid !== id));
        Swal.fire("Deleted!", "Page has been deleted.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete page.", "error");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      Swal.fire("Info", "No Pages selected.", "info");
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${selectedIds.length} selected pages?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    });

    if (result.isConfirmed) {
      try {
        await Promise.all(
          selectedIds.map((id) =>
            fetch(
              `https://jumeirah.premierwebtechservices.com/backend/api/admin/pages/${id}`,
              {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }
            )
          )
        );
        fetchSizes();
        setSelectedIds([]);
        Swal.fire("Deleted!", "Selected pages have been deleted.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete selected pages.", "error");
      }
    }
  };

  const handleSelectAll = (e) => {
    const idsOnPage = sizes.map((size) => size.id);
    if (e.target.checked) {
      setSelectedIds([...new Set([...selectedIds, ...idsOnPage])]);
    } else {
      setSelectedIds(selectedIds.filter((id) => !idsOnPage.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold ">Pages</h1>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mb-4">
        <div className="flex items-center rounded-md px-3 py-2 flex-1 min-w-0"></div>
        <button
          onClick={handleBulkDelete}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Delete Selected
        </button>
        <button
          onClick={() => navigate("/admin/pages/add")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <Plus size={18} className="inline mr-2" />
          Add Pages
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-2 mb-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          Show{" "}
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="border p-1 rounded bg-transparent"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>{" "}
          entries
        </div>
        <div
          className="flex items-center px-3 py-2 w-full sm:w-64"
          style={{ width: "450px", marginRight: "-13px" }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border-sky-1 p-2 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <fieldset className="border border-gray-700 rounded-lg p-4 mb-6">
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2 border text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      sizes.length > 0 &&
                      sizes.every((s) => selectedIds.includes(s.id))
                    }
                  />
                </th>
                <th className="p-2 border text-center">Name</th>
                <th className="p-2 border text-center">Slug</th>
                <th className="p-2 border text-center">Status</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    Loading pages...
                  </td>
                </tr>
              ) : sizes.length > 0 ? (
                sizes.map((size) => (
                  <tr key={size.id} className="hover:bg-gray-100">
                    <td className="p-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(size.id)}
                        onChange={() => handleSelectRow(size.id)}
                      />
                    </td>
                    <td className="p-2 border ">{size.title}</td>
                    <td className="p-2 border ">{size.slug}</td>
                    <td className="p-2 border">
                      <span
                        className={
                          size.status === 1 || size.status === true
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {size.status === 1 || size.status === true
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => navigate(`/admin/pages/${size.id}/edit`)}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(size.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No Pages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
        {/* Entries Count */}
        <div className="text-gray-600 text-xl ml-3 mb-4 font-semibold">
          Showing {sizes.length === 0 ? 0 : 1} to {sizes.length} of {totalItems}{" "}
          entries
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-transparent"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizesTable;
