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
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="p-6 max-w-6xl mx-auto border rounded-xl bg-white dark:bg-gray-900 shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-4xl font-bold">Services</CardTitle>
            <CardDescription className="text-3xl font-bold">
              Manage your Services
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex items-center rounded-md px-3 py-2 flex-1 min-w-0"></div>
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
            <Plus className="mr-2 h-4 w-4 text-xl" /> Add New Service
          </Button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <label>Show</label>
            <select
              className="mb-2 border "
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
              placeholder="Search services..."
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
          <fieldset className="border border-gray-700 rounded-lg p-2 mb-6">
            <Table className="text-center">
              <TableHeader className="text-center">
                <TableRow className="text-center">
                  <TableHead className=" text-center min-w-[150px] w-[25%] text-xl text-white bg-black">
                    <input
                      type="checkbox"
                      checked={areAllOnPageSelected}
                      onChange={handleSelectAllSeasons}
                    />
                  </TableHead>
                  <TableHead className=" text-center min-w-[150px] w-[25%] text-xl text-white bg-black">
                    Name
                  </TableHead>
                  <TableHead className="text-center min-w-[150px] w-[25%] text-xl text-white bg-black">
                    Slug
                  </TableHead>
                  <TableHead className=" text-center min-w-[150px] w-[25%] text-xl text-white bg-black">
                    Status
                  </TableHead>
                  <TableHead className=" text-center min-w-[150px] w-[25%] text-xl text-white bg-black">
                    Actions
                  </TableHead>
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
                      <TableCell className="text-xl">
                        {s.service_name}
                      </TableCell>
                      <TableCell className="text-xl">{s.slug}</TableCell>
                      <TableCell className="text-xl">
                        {s.status ? (
                          <span className="ml-3 px-3 py-1 rounded-full text-base font-semibold bg-green-100 text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="ml-3 px-3 py-1 rounded-full text-base font-semibold  bg-red-100 text-red-700">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="flex justify-center items-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/services/${s.id}/edit`)
                          }
                          className="text-blue-500 mr-3"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteSeason(s.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="text-xl">
                    <TableCell colSpan={7} className="text-center">
                      No services found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </fieldset>
        </div>

        <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
          {/* Showing text */}
          <span className="text-xl font-semibold text-gray-600">
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
    </div>
  );
};

export default SeasonsPage;
