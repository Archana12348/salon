import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/Table";
import { Edit, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";

const HeadCategoriesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDir, setSortDir] = useState("desc");

  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/categories?page=${currentPage}&perPage=${perPage}&search=${searchTerm}&sortDir=${sortDir}`,
      );
      const result = await response.json();

      setData(result.data || []);
      if (result.meta) {
        setCurrentPage(result.meta.current_page);
        setLastPage(result.meta.last_page);
        setTotalItems(result.meta.total);
        setFrom(result.meta.from || 0);
        setTo(result.meta.to || 0);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage, searchTerm, sortDir]);

  const areAllSelected =
    data.length > 0 && data.every((item) => selectedIds.includes(item.id));

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.map((item) => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = async (cat) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${cat.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(
          `https://jumeirah.premierwebtechservices.com/backend/api/admin/categories/${cat.id}`,
          { method: "DELETE" },
        );

        const data = await response.json(); // ✅ get JSON data
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to delete category.");
        }

        await fetchCategories();
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          error.message || "Failed to delete category.",
          "error",
        );
      }
    }
  };

  const handleBulkDelete = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${selectedIds.length} selected categories?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    });

    if (!confirmed.isConfirmed) return;

    try {
      const response = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/categories/bulk-delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedIds,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Bulk delete failed");
      }

      await fetchCategories();
      setSelectedIds([]);

      Swal.fire(
        "Deleted!",
        "Selected categories have been deleted.",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      {/* Card Header */}
      <CardHeader className="space-y-4">
        <div className="flex flex-col space-y">
          <CardTitle className="text-2xl sm:text-2xl">Categories</CardTitle>
          <CardDescription className="text-md">
            Manage your top-level categories
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex items-center rounded-md px-3 py-2 flex-1 min-w-0"></div>
          {selectedIds.length > 0 && (
            <Button
              className="bg-red-400 hover:bg-red-600 text-white"
              onClick={handleBulkDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Bulk Delete ({selectedIds.length})
            </Button>
          )}

          <Button
            className="flex-shrink-0 w-full sm:w-auto"
            onClick={() => navigate("add")}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Category</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Show per page + Search */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex items-center gap-2 text-base">
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
            style={{ width: "350px", marginRight: "-13px" }}
          >
            <Input
              placeholder="Search here categories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border-none p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
            />
          </div>
        </div>
      </CardHeader>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <fieldset className="border border-gray-700 rounded-lg p-4 mb-6">
          <Table className="min-w-[640px] w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-white text-md bg-black">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                    checked={areAllSelected}
                    onChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="min-w-[150px] w-[25%] text-md text-white bg-black">
                  Name
                </TableHead>
                <TableHead className="min-w-[150px] w-[20%] text-md text-white bg-black">
                  Slug
                </TableHead>
                <TableHead className="min-w-[150px] w-[20%] text-md text-white bg-black">
                  Status
                </TableHead>
                <TableHead className="min-w-[100px] w-[20%]   text-md text-white bg-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                        checked={selectedIds.includes(cat.id)}
                        onChange={() => handleSelect(cat.id)}
                      />
                    </TableCell>
                    <TableCell className="text-md">{cat.name}</TableCell>
                    <TableCell className="text-md">{cat.slug}</TableCell>
                    <TableCell className="text-md">
                      <span
                        className={`ml-3 px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        cat.active === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                      >
                        {cat.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </TableCell>

                    <TableCell className=" text-md text-right">
                      <div className="flex items-center justify-start gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            navigate(`/admin/category/${cat.id}/edit`)
                          }
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(cat)}
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </fieldset>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-2 ">
          <div className="text-gray-600 text-md ml-3 mb-4">
            Showing {totalItems === 0 ? 0 : from} to {to} of {totalItems}{" "}
            entries
          </div>
          <div className="flex gap-1 mr-3 mb-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#00CED1] hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            {[...Array(lastPage)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? "bg-[#00CED1] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              disabled={currentPage === lastPage || lastPage === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === lastPage || lastPage === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#00CED1] hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadCategoriesTable;
