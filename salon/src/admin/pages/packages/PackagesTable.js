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
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ useSearchParams use
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

const FabricsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [fabrics, setFabrics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFabrics, setSelectedFabrics] = useState([]);

  // ✅ page URL param se lo
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const token = localStorage.getItem("token");

  // ✅ Jab bhi page change ho → URL update karo
  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    if (page !== currentPage) {
      searchParams.set("page", page);
      setSearchParams(searchParams, { replace: true });
    }
  }, [page, searchParams, setSearchParams]);

  // ✅ Jab bhi searchTerm change ho to page reset karo aur URL update ho
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setPage(1);
      searchParams.set("page", "1");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchTerm]);

  // Fetch fabrics from API
  const fetchFabrics = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/packages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          perPage: itemsPerPage,
          page,
          search: searchTerm || undefined,
        },
      });
      console.log(res.data.data[0].active);
      debugger;

      const data = res.data.data || [];
      const meta = res.data.meta || {};

      setFabrics(data);
      setTotalPages(meta.last_page || 1);
      setTotalItems(meta.total || 0);
      setStartIndex(meta.from ? meta.from - 1 : 0); // meta.from is 1-based
      setEndIndex(meta.to || 0);
    } catch (error) {
      console.error("Error fetching fabrics:", error.response || error);
    }
  };

  useEffect(() => {
    fetchFabrics();
  }, [page, itemsPerPage, searchTerm]);

  // Delete single fabric
  const deleteFabric = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This fabric will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/admin/packages/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Deleted!", "The fabric has been deleted.", "success");
          fetchFabrics();
        } catch (error) {
          console.error("Error deleting fabric:", error.response || error);
          Swal.fire("Error", "Failed to delete the fabric.", "error");
        }
      }
    });
  };

  // Bulk delete
  const handleBulkDelete = () => {
    if (selectedFabrics.length === 0) return;

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedFabrics.length} fabrics.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(
            selectedFabrics.map((id) =>
              axios.delete(`http://localhost:8000/api/admin/packages/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
            )
          );
          Swal.fire(
            "Deleted!",
            "Selected fabrics have been deleted.",
            "success"
          );
          setSelectedFabrics([]);
          fetchFabrics();
        } catch (error) {
          console.error("Bulk delete error:", error.response || error);
          Swal.fire("Error", "Failed to delete selected fabrics.", "error");
        }
      }
    });
  };

  const areAllOnPageSelected =
    fabrics.length > 0 &&
    fabrics.every((fabric) => selectedFabrics.includes(fabric.id));

  const handleSelectAllFabrics = (e) => {
    const idsOnPage = fabrics.map((fabric) => fabric.id);
    if (e.target.checked) {
      setSelectedFabrics((prev) => [...new Set([...prev, ...idsOnPage])]);
    } else {
      setSelectedFabrics((prev) =>
        prev.filter((id) => !idsOnPage.includes(id))
      );
    }
  };

  const handleSelectFabric = (id) => {
    setSelectedFabrics((prev) =>
      prev.includes(id)
        ? prev.filter((fabricId) => fabricId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      <CardHeader>
        <div className="flex justify-between text-xl items-center">
          <div>
            <CardTitle className="text-3xl sm:text-3xl">Packages</CardTitle>
            <CardDescription className="text-base">
              Manage your packages
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex items-center rounded-md px-3 py-2 flex-1 min-w-0"></div>
          {selectedFabrics.length > 0 && (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleBulkDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Bulk Delete ({selectedFabrics.length})
            </Button>
          )}

          <Button onClick={() => navigate("/admin/packages/add")}>
            <Plus className="mr-2 h-4 w-4" /> Add New Packages
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-xl font-semibold gap-2">
            <label>Show</label>
            <select
              className="mb-2 border dark:bg-slate-600"
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
          <div className="flex items-center px-0 py-2 w-72">
            <Input
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none ml-2 w-full"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px] w-[25%] text-xl text-white bg-black">
                  <input
                    type="checkbox"
                    checked={areAllOnPageSelected}
                    onChange={handleSelectAllFabrics}
                  />
                </TableHead>
                <TableHead className="min-w-[150px] w-[25%] text-xl text-white bg-black">
                  Name
                </TableHead>
                <TableHead className="min-w-[150px] w-[25%] text-xl text-white bg-black">
                  Slug
                </TableHead>
                <TableHead className="min-w-[150px] w-[25%] text-xl text-white bg-black">
                  Status
                </TableHead>
                <TableHead className="min-w-[150px] w-[25%] text-xl text-white bg-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fabrics.length > 0 ? (
                fabrics.map((fabric) => (
                  <TableRow key={fabric.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedFabrics.includes(fabric.id)}
                        onChange={() => handleSelectFabric(fabric.id)}
                      />
                    </TableCell>
                    <TableCell className="text-xl">{fabric.name}</TableCell>
                    <TableCell className="text-xl">{fabric.slug}</TableCell>
                    <TableCell className="text-xl">
                      {fabric.active === true || fabric.active === 1 ? (
                        <span className="text-green-500 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-xl">
                      <button
                        onClick={() =>
                          navigate({
                            pathname: `/admin/packages/${fabric.id}/edit`,
                            search: `?page=${page}&per_page=${itemsPerPage}`,
                          })
                        }
                        className="text-blue-500 mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 "
                        onClick={() => deleteFabric(fabric.id)}
                      >
                        <Trash2 className="h-5 w-5 mr-1" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No packages found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 flex-wrap gap-2 text-xl font-semibold">
          <div>
            Showing {totalItems === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
            {totalItems} entries
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Previous Button */}
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="bg-red-500 text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>

            {/* First Page */}
            <button
              className={`px-3 py-1 border rounded ${
                page === 1
                  ? "bg-red-600 text-white"
                  : "bg-transparent dark:text-white"
              }`}
              onClick={() => setPage(1)}
            >
              1
            </button>

            {/* Left Dots */}
            {page > 3 && <span className="px-2 flex items-center">...</span>}

            {/* Dynamic Middle Pages */}
            {Array.from({ length: 3 }, (_, i) => {
              const pageNumber = page - 1 + i;
              if (pageNumber > 1 && pageNumber < totalPages) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`px-3 py-1 border rounded ${
                      page === pageNumber
                        ? "bg-red-600 text-white"
                        : "bg-transparent dark:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}

            {/* Right Dots */}
            {page < totalPages - 2 && (
              <span className="px-2 flex items-center">...</span>
            )}

            {/* Last Page */}
            {totalPages > 1 && (
              <button
                className={`px-3 py-1 border rounded ${
                  page === totalPages
                    ? "bg-red-600 text-white"
                    : "bg-transparent dark:text-white"
                }`}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
            )}

            {/* Next Button */}
            <Button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="bg-red-500 text-white disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default FabricsPage;
