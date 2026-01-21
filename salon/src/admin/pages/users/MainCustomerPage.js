import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/customers`,
        {
          params: {
            page: currentPage,
            perPage: usersPerPage,
            search: searchTerm,
            sort: sortOrder,
          },
        }
      );

      setUsers(res.data?.data || []);
      setMeta(res.data?.meta || null);
      console.log("dataaa", res.data.data);
      debugger;
      // remove ids not on current page
      setSelectedUsers((prev) =>
        prev.filter((id) => res.data?.data?.data?.some((u) => u.id === id))
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [currentPage, usersPerPage, searchTerm, sortOrder]);

  /* ================= SINGLE DELETE ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/users/${id}`
      );
      toast.success("User deleted successfully");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  /* ================= BULK DELETE ================= */
  const handleBulkDelete = async () => {
    if (!selectedUsers.length) {
      toast.warning("No customers selected");
      return;
    }

    const result = await Swal.fire({
      title: `Delete ${selectedUsers.length} users?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        "https://jumeirah.premierwebtechservices.com/backend/api/admin/users/bulk-delete",
        {
          data: { ids: selectedUsers },
        }
      );

      setSelectedUsers([]);
      fetchUsers();

      Swal.fire("Deleted!", "Users deleted successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Bulk delete failed.", "error");
    }
  };

  /* ================= CHECKBOX HANDLERS ================= */
  const toggleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (users.every((u) => selectedUsers.includes(u.id))) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u.id));
    }
  };

  const areAllOnPageSelected =
    users.length > 0 && users.every((u) => selectedUsers.includes(u.id));

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customers</h2>
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
          className="bg-[#00CED1] text-white px-4 py-2 rounded hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)]"
        >
          Add Customer
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center gap-2 text-md font-semibold">
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
            placeholder="Search customers..."
            className="border-none p-2 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <fieldset className="border border-gray-700 rounded-lg  mb-6">
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
                  <td colSpan="6" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : users.length ? (
                users.map((u) => (
                  <tr key={u.id} className="text-center border-b">
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(u.id)}
                        onChange={() => toggleSelectUser(u.id)}
                      />
                    </td>
                    <td className="border p-2 text-md">{u.name}</td>
                    <td className="border p-2 text-md">{u.email}</td>
                    <td className="border p-2 text-md">{u.phone}</td>
                    <td className="border p-2 text-md">
                      {u.active === true ? "Active" : "Inactive"}
                    </td>
                    <td className=" p-2 flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setShowModal(true);
                        }}
                        className="text-green-500 hover:text-green-700"
                      >
                        <Eye className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-between items-center p-4 border-t">
          <div className="text-md font-semibold">
            Showing {meta.from} to {meta.to} of {meta.total} entries
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              disabled={meta.current_page === 1}
              onClick={() => setCurrentPage(meta.current_page - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === meta.current_page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              disabled={meta.current_page === meta.last_page}
              onClick={() => setCurrentPage(meta.current_page + 1)}
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
