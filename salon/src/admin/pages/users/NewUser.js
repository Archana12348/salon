import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    roles: [],
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    longitude: "",
    latitude: "",
    status: "active",
    user_type: "",
  });

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation not supported by browser.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, options, multiple } = e.target;

    if (multiple) {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
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

    try {
      let base64Image = "";

      if (image) {
        base64Image = await toBase64(image);
      }

      // ✅ Custom validation messages
      const fieldErrorMessages = {
        name: "Please enter your full name.",
        phone: "Please enter your phone number.",
        email: "Please enter your email address.",
        user_type: "Please select the user type.",
        gender: "Please select your gender.",
        status: "Please select the user status.",
      };

      // ✅ Validate fields before API call
      for (const key in fieldErrorMessages) {
        const value = formData[key];
        if (!value || value.toString().trim() === "") {
          toast.error(fieldErrorMessages[key], {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored", // you can also use "light" or "dark"
          });
          return; // stop further execution
        }
      }

      const jsonData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        roles: [formData.roles],
        gender: formData.gender,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        zipcode: formData.zipcode,
        longitude: longitude,
        latitude: latitude,
        status: formData.status,
        user_type: formData.user_type,
        avatar: base64Image,
      };

      const res = await fetch("http://localhost:8000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const result = await res.json();
      console.log("result", result);

      if (result.success) {
        toast.success("User created successfully!");
        setTimeout(() => navigate("/admin/user"), 1500);
      } else {
        toast.error(result.message || "Failed to create user.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      roles: "",
      gender: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
      longitude: "",
      latitude: "",
      status: "active",
      user_type: "",
    });
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-black-600">USER</h1>
      <p className="text-gray-500">New User</p>
      <hr className="my-2 border-gray-300" />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 "
        autoComplete="off"
      >
        {/* Name */}
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
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
          />
        </div>
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Phone Number <span className="text-red-600">*</span>
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
        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            name="password"
            autoComplete="off"
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
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={handleImageChange}
            className="w-full border p-2 rounded dark:bg-transparent text-black"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
        </div>
        {/* User Type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            User Type <span className="text-red-600">*</span>
          </label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 dark:bg-transparent text-black"
          >
            <option value="">Select Type</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        {/* Status */}
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
        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
