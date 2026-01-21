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
import { useSearchParams, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Trash2, Eye, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const ContactsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const token = localStorage.getItem("token");

  /* ---------------- Pagination sync ---------------- */
  useEffect(() => {
    searchParams.set("page", page);
    setSearchParams(searchParams, { replace: true });
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  /* ---------------- Fetch Contacts ---------------- */
  const fetchContacts = async () => {
    const res = await axios.get(
      "https://jumeirah.premierwebtechservices.com/backend/api/admin/contacts",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          perPage: itemsPerPage,
          page,
          search: searchTerm || undefined,
        },
      }
    );

    const { data, meta } = res.data;

    setContacts(data);
    setTotalPages(meta.last_page);
    setTotalItems(meta.total);
    setStartIndex(meta.from ? meta.from - 1 : 0);
    setEndIndex(meta.to || 0);
  };

  useEffect(() => {
    fetchContacts();
  }, [page, itemsPerPage, searchTerm]);

  /* ---------------- Selection Logic ---------------- */
  const areAllOnPageSelected =
    contacts.length > 0 &&
    contacts.every((c) => selectedContacts.includes(c.id));

  const handleSelectAllFabrics = (e) => {
    if (e.target.checked) {
      const pageIds = contacts.map((c) => c.id);
      setSelectedContacts((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = contacts.map((c) => c.id);
      setSelectedContacts((prev) => prev.filter((id) => !pageIds.includes(id)));
    }
  };

  const toggleSingleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------------- View Contact ---------------- */
  const viewContact = async (id) => {
    const res = await axios.get(
      `https://jumeirah.premierwebtechservices.com/backend/api/admin/contacts/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const contact = res.data.data;

    Swal.fire({
      title: contact.name,
      html: `
        <p><b>Email:</b> ${contact.email}</p>
        <hr/>
        <p>${contact.message}</p>
      `,
      confirmButtonText: "Close",
    });

    fetchContacts();
  };

  /* ---------------- Single Delete ---------------- */
  const deleteContact = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      await axios.delete(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/contacts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts();
    }
  };

  /* ---------------- Bulk Delete ---------------- */
  const bulkDelete = async () => {
    if (!selectedContacts.length) {
      Swal.fire("No selection", "Please select contacts first", "info");
      return;
    }

    const confirm = await Swal.fire({
      title: `Delete ${selectedContacts.length} messages?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    await axios.post(
      "https://jumeirah.premierwebtechservices.com/backend/api/admin/contacts/bulk-delete",
      { ids: selectedContacts },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSelectedContacts([]);
    fetchContacts();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      <CardHeader>
        <CardTitle className="text-1xl">Contact Messages</CardTitle>
        <CardDescription>Manage contact inquiries</CardDescription>
        <div className="flex justify-end gap-2">
          <Button onClick={() => navigate("/admin/contacts/create")}>
            <Plus size={18} /> Add Contact Message
          </Button>

          <Button className="bg-red-600 text-white" onClick={bulkDelete}>
            <Trash2 size={18} /> Bulk Delete
          </Button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2 items-center text-md font-semibold">
            <label>Show</label>
            <select
              className="border dark:bg-slate-600"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
            <label>entries</label>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Search contacts messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 md:w-96 lg:w-[32rem]"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[50px] text-white bg-black">
                <input
                  type="checkbox"
                  checked={areAllOnPageSelected}
                  onChange={handleSelectAllFabrics}
                />
              </TableHead>
              <TableHead className="bg-black text-white">Name</TableHead>
              <TableHead className="bg-black text-white">Email</TableHead>
              {/* <TableHead className="bg-black text-white">Subject</TableHead> */}
              <TableHead className="bg-black text-white">Status</TableHead>
              <TableHead className="bg-black text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contacts.length ? (
              contacts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(c.id)}
                      onChange={() => toggleSingleSelect(c.id)}
                    />
                  </TableCell>
                  <TableCell className="text-md font-semibold">
                    {c.name}
                  </TableCell>
                  <TableCell className="text-md font-semibold">
                    {c.email}
                  </TableCell>
                  {/* <TableCell className="text-md font-semibold">{c.subject ?? "-"}</TableCell> */}
                  <TableCell className="text-md font-semibold">
                    {c.is_read ? (
                      <span className="text-green-500 font-semibold">Read</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Unread</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-blue-500 mr-3"
                      onClick={() => viewContact(c.id)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => deleteContact(c.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No contacts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4 text-md font-semibold">
          <div>
            Showing {startIndex + 1} to {endIndex} of {totalItems}
          </div>

          <div className="flex gap-2">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft /> Prev
            </Button>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next <ChevronRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ContactsPage;
