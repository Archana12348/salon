import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    status: "1", // Add default status value
    user_type: "", // Added user_type field
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams(); // Fetch user ID from route
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://jumeirah.premierwebtechservices.com/backend/api/admin/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        console.log(data);
        debugger;
        if (res.ok && data.data) {
          const user = data.data;
          setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            password: "",
            roles: user.roles?.[0]?.id || "",
            gender: user.gender || "",
            address: user.address || "",
            country: user.country || "",
            state: user.state || "",
            city: user.city || "",
            zipcode: user.zipcode || "",
            status: String(user.status || "1"), // Ensure string
            user_type: user.user_type || "", // Populate user_type
          });
          setImagePreview(user.avatar || null);
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      } catch {
        toast.error("Error fetching user details");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, options, multiple } = e.target;
    if (multiple) {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = rej;
    });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const updatedData = {
        ...formData,
      };

      // Conditionally add image if a new one was selected
      if (image) {
        let base64Image = image ? await toBase64(image) : null;
        updatedData.avatar = base64Image;
      }

      const res = await fetch(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await res.json();
      console.log("result", result);
      debugger;

      if (res.ok) {
        toast.success("User updated successfully!");
        setTimeout(() => navigate("/admin/user"), 1500);
      } else {
        toast.error(result.message || "Failed to update user.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto border bg-slate-50 rounded-xl dark:bg-transparent">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-black-600">USER</h1>
      <p className="text-gray-500">Edit User</p>
      <hr className="my-2 border-gray-300" />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent"
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Phone <span className="text-red-600">*</span>
          </label>
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            inputClass="!w-full !py-2 !px-10"
            inputStyle={{
              borderRadius: "0.375rem",
              width: "100%",
              backgroundColor: "transparent",
            }}
            buttonStyle={{ backgroundColor: "transparent", border: "none" }}
            containerStyle={{ width: "100%" }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Password (Leave blank to keep unchanged)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Gender <span className="text-red-600">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
          >
            {formData.gender}
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Upload Profile Image */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="avatar"
          />
          {imagePreview && (
            <img
              src={`https://jumeirah.premierwebtechservices.com/backend/api${imagePreview}`}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full"
            />
          )}
        </div>

        {/*  User Type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            User Type <span className="text-red-600">*</span>
          </label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
            required
          >
            <option value="">Select Type</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/*  Status */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
          >
            Update User
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
