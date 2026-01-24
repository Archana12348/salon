import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

export default function RoleTable() {
  const navigate = useNavigate();

  /* -------------------- STATE -------------------- */
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [links, setLinks] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  /* -------------------- CONSTANTS -------------------- */
  const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  /* -------------------- DEBOUNCED SEARCH -------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* -------------------- FETCH DATA -------------------- */
  const fetchRoles = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://jumeirah.premierwebtechservices.com/backend/api/admin/bookings?page=${page}&perPage=${perPage}&search=${debouncedSearch}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        const p = json.data;

        setRoles(p.data);
        setCurrentPage(p.current_page);
        setTotalItems(p.total);
        setLinks(p.links);
        setFrom(p.from);
        setTo(p.to);
      } catch (err) {
        toast.error("Failed to load bookings ❌");
      }
      setLoading(false);
    },
    [perPage, debouncedSearch],
  );

  useEffect(() => {
    fetchRoles(currentPage);
  }, [fetchRoles, currentPage]);

  /* -------------------- STATUS UPDATE -------------------- */
  const handleStatusChange = async (id, status) => {
    const oldRoles = [...roles];

    setUpdatingStatusId(id);
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

    try {
      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/bookings/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        },
      );

      if (!res.ok) throw new Error();
      toast.success("Status updated");
    } catch {
      toast.error("Status update failed ❌");
      setRoles(oldRoles); // rollback
    }
    setUpdatingStatusId(null);
  };

  /* -------------------- DELETE -------------------- */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const message = await response.json(); // ✅ only once
      console.log(message);

      toast.success(message.message || "Delete Successfully");
      fetchRoles(currentPage);
    } catch (e) {
      console.log(e);
      toast.error("Delete failed ❌");
    }
  };

  /* -------------------- BULK DELETE -------------------- */
  const handleBulkDelete = async () => {
    if (!selectedRoles.length) {
      toast.warning("Select at least one booking");
      return;
    }

    const confirm = await Swal.fire({
      title: "Delete selected?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/admin/bookings/bulk-delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ids: selectedRoles }),
      },
    );

    setSelectedRoles([]);
    fetchRoles(1);
  };

  /* -------------------- SELECT TOGGLE -------------------- */
  const toggleSelectRole = (id) => {
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedRoles(
      selectedRoles.length === roles.length ? [] : roles.map((r) => r.id),
    );
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      <h2 className="text-2xl font-bold mb-4 ">Bookings</h2>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex items-center rounded-md px-3 py-2 flex-1 min-w-0"></div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/admin/bookings/add")}
            className="bg-[#00CED1] text-white px-4 py-2 rounded"
          >
            Add Booking
          </button>
          <button
            onClick={handleBulkDelete}
            className="bg-[#00CED1] text-white px-4 py-2 rounded"
          >
            Bulk Delete
          </button>
        </div>
      </div>
      {/* Show per page + Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-3 mt-3">
        <div className="flex items-center gap-2 text-md  font-semibold">
          <label>Show</label>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded p-1 text-sm mb-1"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <label>entries</label>
        </div>
        <div
          className="flex items-center px-3 py-2 w-full sm:w-64"
          style={{ width: "450px", marginRight: "-13px" }}
        >
          <input
            placeholder="Search here bookings..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-500 p-2 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-white text-md  bg-black">
                <input
                  type="checkbox"
                  checked={
                    roles.length > 0 && selectedRoles.length === roles.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-2 text-white text-md  bg-black">
                Booking Number
              </th>
              <th className="p-2 text-white text-md  bg-black">Name</th>
              <th className="p-2 text-white text-md  bg-black">Email</th>
              <th className="p-2 text-white text-md  bg-black">Status</th>
              <th className="p-2 text-white text-md  bg-black ">Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(r.id)}
                    onChange={() => toggleSelectRole(r.id)}
                  />
                </td>
                <td className="p-2 text-md ">{r.booking_code || "N/A"}</td>
                <td className="p-2 text-md ">{r.name || "-"}</td>
                <td className="p-2 text-md ">{r.email || "-"}</td>

                <td className="p-2 text-md ">
                  <div className="relative">
                    <select
                      disabled={updatingStatusId === r.id}
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        statusClasses[r.status]
                      }`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    {updatingStatusId === r.id && (
                      <span className="absolute right-2 top-2 h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                    )}
                  </div>
                </td>

                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/admin/bookings/${r.id}/edit`)}
                    className="text-blue-600  p-2 rounded hover:text-blue-700"
                    title="Edit"
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600 p-2 rounded hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 mb-4 gap-2">
        <div className="font-semibold text-md ">
          Showing {from} to {to} of {totalItems} entries
        </div>

        <div className="flex gap-2 flex-wrap">
          {links.map((l, i) => (
            <button
              key={i}
              disabled={!l.page}
              onClick={() => l.page && setCurrentPage(l.page)}
              className={`px-3 py-1 border rounded ${
                l.active ? "bg-[#00CED1] text-white" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: l.label }}
            />
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
