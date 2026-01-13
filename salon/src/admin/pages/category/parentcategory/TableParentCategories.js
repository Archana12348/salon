import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../components/ui/Table";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CardHeader, CardTitle } from "../../../components/ui/Card";

const ParentCategories = () => {
  const navigate = useNavigate();

  const [parentCategories, setParentCategories] = useState([]);
  const [selectedParents, setSelectedParents] = useState([]);

  // pagination & search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // meta
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  // ================= FETCH =================
  const fetchSubCategories = async () => {
    try {
      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/subcategories?page=${currentPage}&perPage=${itemsPerPage}&search=${searchTerm}`
      );
      const result = await res.json();

      setParentCategories(result.data || []);
      setTotalPages(result.meta.last_page);
      setTotalEntries(result.meta.total);
      setFrom(result.meta.from || 0);
      setTo(result.meta.to || 0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch subcategories");
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [currentPage, itemsPerPage, searchTerm]);

  // ================= SELECTION =================
  const areAllSelected =
    parentCategories.length > 0 &&
    parentCategories.every((cat) => selectedParents.includes(cat.id));

  const handleSelectAll = () => {
    if (areAllSelected) {
      setSelectedParents([]);
    } else {
      setSelectedParents(parentCategories.map((cat) => cat.id));
    }
  };

  const handleSelectCategory = (id) => {
    setSelectedParents((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ================= DELETE =================
  const deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await fetch(
          `https://jumeirah.premierwebtechservices.com/backend/api/admin/subcategories/${id}`,
          { method: "DELETE" }
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        Swal.fire("Deleted!", "Category deleted successfully", "success");
        fetchSubCategories();
        setSelectedParents((prev) => prev.filter((x) => x !== id));
      } catch (err) {
        toast.error(err.message);
      }
    });
  };

  // ================= BULK DELETE =================
  const handleBulkDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${selectedParents.length} selected categories?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        "https://jumeirah.premierwebtechservices.com/backend/api/admin/subcategories/bulk-delete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: selectedParents }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      Swal.fire("Deleted!", data.message, "success");
      setSelectedParents([]);
      fetchSubCategories();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl sm:text-2xl">SubCategories</CardTitle>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex items-center rounded-md px-3 py-2 flex-1 min-w-0"></div>
          {selectedParents.length > 0 && (
            <Button
              className="bg-red-400 hover:bg-red-600 text-white"
              onClick={handleBulkDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Bulk Delete ({selectedParents.length})
            </Button>
          )}

          <Button onClick={() => navigate("/admin/subcategory/add")}>
            <Plus className="mr-2 h-4 w-4" />
            Add SubCategory
          </Button>
        </div>
      </CardHeader>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        {/* Show entries */}
        <div className="flex items-center pl-2 font-bold gap-2 text-xl">
          <label>Show</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded p-1 text-sm bg-transparent"
          >
            {[10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <label>entries</label>
        </div>

        {/* Search */}
        <div className="flex items-center pr-3 py-2 w-max sm:w-72">
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

      {/* Table */}
      <fieldset className="border border-gray-700 rounded-lg p-4">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-black text-white">
                <input
                  type="checkbox"
                  checked={areAllSelected}
                  onChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="bg-black text-white">Name</TableHead>
              <TableHead className="bg-black text-white">Slug</TableHead>
              <TableHead className="bg-black text-white">Category</TableHead>
              <TableHead className="bg-black text-white">Status</TableHead>
              <TableHead className="bg-black text-white text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parentCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              parentCategories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedParents.includes(cat.id)}
                      onChange={() => handleSelectCategory(cat.id)}
                    />
                  </TableCell>
                  <TableCell className="text-xl">{cat.name}</TableCell>
                  <TableCell className="text-xl">{cat.slug}</TableCell>
                  <TableCell className="text-xl">
                    {cat.category_name || "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xl font-semibold ${
                        cat.active === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cat.active === 1 ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/admin/subcategory/${cat.id}/edit`)
                      }
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCategory(cat.id)}
                    >
                      <Trash2 className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </fieldset>

      {/* Pagination */}
      <div className="flex justify-between mt-4 mb-4">
        <div className="text-xl font-semibold">
          Showing {from} to {to} of {totalEntries} entries
        </div>

        <div className="flex gap-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "bg-sky-600 text-white" : ""}
            >
              {page}
            </Button>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParentCategories;
