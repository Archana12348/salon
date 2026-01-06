"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

/* -------------------- Debounce Hook -------------------- */
const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const SeasonsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [seasons, setSeasons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  /* -------------------- Fetch Services -------------------- */
  const fetchSeasons = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          perPage: itemsPerPage,
          search: debouncedSearch || undefined,
        },
      });

      setSeasons(res.data.data || []);
      setTotalPages(res.data.meta?.last_page || 1);
      setTotalEntries(res.data.meta?.total || 0); // ✅ ADD THIS
    } catch (error) {
      console.error("Error fetching seasons:", error);
    }
  };
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    fetchSeasons();
  }, [page, itemsPerPage, debouncedSearch]);

  /* -------------------- Delete Single -------------------- */
  const deleteSeason = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This service will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Deleted!", "Service deleted successfully.", "success");
      fetchSeasons();
    } catch (error) {
      Swal.fire("Error", "Delete failed.", "error");
    }
  };

  /* -------------------- Bulk Delete -------------------- */
  const handleBulkDelete = async () => {
    if (selectedSeasons.length === 0) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedSeasons.length} services.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/admin/services/bulk-delete",
        { ids: selectedSeasons },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSelectedSeasons([]);
      fetchSeasons();
      Swal.fire("Deleted!", "Services deleted successfully.", "success");
    } catch (error) {
      Swal.fire("Error", "Bulk delete failed.", "error");
    }
  };

  const areAllOnPageSelected =
    seasons.length > 0 && seasons.every((s) => selectedSeasons.includes(s.id));

  const handleSelectAllSeasons = (e) => {
    if (e.target.checked) {
      setSelectedSeasons(seasons.map((s) => s.id));
    } else {
      setSelectedSeasons([]);
    }
  };

  const handleSelectSeason = (id) => {
    setSelectedSeasons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 lg:px-6 py-4">
      <h1 className="text-3xl font-bold mb-4 dark:text-black">Services</h1>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>Manage your Services</CardDescription>
            </div>

            <div className="flex gap-2">
              {selectedSeasons.length > 0 && (
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Bulk Delete ({selectedSeasons.length})
                </Button>
              )}

              <Button onClick={() => navigate("/admin/bookingadd")}>
                <Plus className="mr-2 h-4 w-4" /> Add New Service
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <label>Show</label>
              <select
                className="mb-2 dark:bg-slate-500 border"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <label>entries</label>
            </div>
            <div className="className w-[30rem] pr-2">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="border-none ml-2"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <input
                      type="checkbox"
                      checked={areAllOnPageSelected}
                      onChange={handleSelectAllSeasons}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {seasons.length > 0 ? (
                  seasons.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedSeasons.includes(s.id)}
                          onChange={() => handleSelectSeason(s.id)}
                        />
                      </TableCell>
                      <TableCell>{s.service_name}</TableCell>
                      <TableCell>{s.slug}</TableCell>
                      <TableCell>
                        {s.status ? (
                          <span className="text-green-500 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{s.price}</TableCell>
                      <TableCell>
                        {s.created_at
                          ? new Date(s.created_at).toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="flex">
                        <button
                          onClick={() =>
                            navigate(`/admin/services/${s.id}/edit`)
                          }
                          className="text-blue-500 mr-3"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => deleteSeason(s.id)}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No services found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
            {/* Showing text */}
            <span className="text-sm text-gray-600">
              Showing {(page - 1) * itemsPerPage + 1}–
              {Math.min(page * itemsPerPage, totalEntries)} of {totalEntries}{" "}
              entries
            </span>

            {/* Pagination controls */}
            <div className="flex items-center gap-1">
              <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="bg-red-500 text-white px-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {getPageNumbers().map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded border text-sm
          ${
            p === page
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
                >
                  {p}
                </button>
              ))}

              <Button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="bg-red-500 text-white px-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonsPage;
