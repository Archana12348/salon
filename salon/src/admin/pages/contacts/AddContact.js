"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";
import axios from "axios";

const ContactAdd = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* ------------------ handle change ------------------ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  /* ------------------ submit ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://jumeirah.premierwebtechservices.com/backend/api/admin/contacts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success", "Contact Message added successfully", "success");
      navigate("/admin/contact");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto border rounded-lg bg-white dark:bg-gray-900 shadow">
      <CardHeader>
        <CardTitle className="text-3xl">Add Contact Message</CardTitle>
        <CardDescription>Create a new contact message manually</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-xl font-semibold">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xl font-semibold">Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xl font-semibold">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="text-xl font-semibold">Subject</label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-xl font-semibold">Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-md p-3 "
              placeholder="Enter message"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white"
            >
              {loading ? "Saving..." : "Save Contact Message"}
            </Button>

            <Button
              type="button"
              className="bg-gray-500 text-white"
              onClick={() => navigate("/admin/contact")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default ContactAdd;
