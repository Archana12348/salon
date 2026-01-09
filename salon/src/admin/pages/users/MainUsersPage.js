import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [total, setTotal] = useState(0);
  const [meta, setMeta] = useState(null); // pagination meta
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users with backend pagination
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/admin/users?page=${currentPage}&perPage=${usersPerPage}&search=${encodeURIComponent(
          searchTerm
        )}&sort=${sortOrder}`
      );
      console.log(res.data.data);
      debugger;

      setUsers(res.data?.data ?? []);
      setMeta(res.data?.meta ?? null);
      setTotal(res.data?.meta?.total ?? 0);

      // clear selection for items not on current page
      setSelectedUsers((prev) =>
        prev.filter((id) => (res.data?.data ?? []).some((u) => u.id === id))
      );
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, usersPerPage, searchTerm, sortOrder]);

  // Delete handlers (same as before)
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/users/${id}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        console.error("Delete failed", error);
        toast.error("Failed to delete user");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast.warning("No users selected");
      return;
    }

    const result = await Swal.fire({
      title: `Delete ${selectedUsers.length} selected users?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.post("http://localhost:8000/api/admin/users/bulk-delete", {
        ids: selectedUsers,
      });

      setSelectedUsers([]);
      fetchUsers();

      Swal.fire(
        "Deleted!",
        "Selected users have been deleted successfully.",
        "success"
      );
    } catch (error) {
      console.error("Bulk delete failed", error);
      Swal.fire("Error!", "Failed to delete selected users.", "error");
    }
  };

  const toggleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length && users.length > 0) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u.id));
    }
  };

  const areAllOnPageSelected =
    users.length > 0 && users.every((u) => selectedUsers.includes(u.id));

  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4 mb-4">
        <div className="flex items-center rounded-md px-3 py-2 flex-1 min-w-0"></div>
        <button
          onClick={handleBulkDelete}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Delete Selected
        </button>

        <button
          onClick={() => navigate("/admin/user/add")}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Add User
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4 mt-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <label>Show</label>
          <select
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-1"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <label>entries</label>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-1"
          >
            <option value="asc">Sort Asc</option>
            <option value="desc">Sort Desc</option>
          </select>
        </div>

        {/* Search box */}
        <div
          className="flex items-center px-3 w-full sm:w-64
             border border-transparent rounded-md
             focus-within:border-black transition"
          style={{ width: "450px" }}
        >
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search users..."
            className="border-none p-2 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <fieldset className="border border-gray-700 rounded-lg p-4 mb-6">
          <table className="min-w-full border border-black">
            <thead className="text-center">
              <tr className="bg-black text-white">
                <th className="p-2 border">
                  <input
                    type="checkbox"
                    checked={areAllOnPageSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center  p-4">
                    Loading...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="text-center border-b ">
                    <td className="p-2 border">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                      />
                    </td>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.phone}</td>
                    <td className="p-2 border">
                      {user.status === 1 || user.status === "1"
                        ? "Active"
                        : "Inactive"}
                    </td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                        className="text-green-500 hover:text-green-700"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`admin/user/${user.id}/edit`)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center  p-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-2 border-t">
          <div className="text-gray-600 font-semibold ml-3 mb-4 text-xl">
            Showing {meta.from ?? 0} to {meta.to ?? 0} of {meta.total ?? 0}{" "}
            entries
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              disabled={meta.current_page === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>

            {/* First Page */}
            <Button
              size="sm"
              variant={meta.current_page === 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(1)}
            >
              1
            </Button>

            {/* Left ellipsis */}
            {meta.current_page > 3 && <span className="px-2">...</span>}

            {/* Middle Pages */}
            {Array.from({ length: 3 }, (_, i) => {
              const pageNumber = meta.current_page - 1 + i;
              if (pageNumber > 1 && pageNumber < meta.last_page) {
                return (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={
                      meta.current_page === pageNumber ? "default" : "outline"
                    }
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              }
              return null;
            })}

            {/* Right ellipsis */}
            {meta.current_page < meta.last_page - 2 && (
              <span className="px-2">...</span>
            )}

            {/* Last Page */}
            {meta.last_page > 1 && (
              <Button
                size="sm"
                variant={
                  meta.current_page === meta.last_page ? "default" : "outline"
                }
                onClick={() => setCurrentPage(meta.last_page)}
              >
                {meta.last_page}
              </Button>
            )}

            <Button
              size="sm"
              disabled={meta.current_page === meta.last_page}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, meta.last_page))
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Customer Details</h2>

            <div className="space-y-3">
              <div>
                <span className="font-semibold">Name:</span> {selectedUser.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser.email}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedUser.phone}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {selectedUser.active == 1 ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersListPage;
