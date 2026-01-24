import React, { useState, useEffect, useRef } from "react";
import RichTextEditor from "../../components/common/RichTextEditor";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function ServiceForm({ initialData = {}, onSubmit }) {
  const [serviceName, setServiceName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("weekly");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("onsite");
  const [status, setStatus] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [weeklySlots, setWeeklySlots] = useState({});
  const [specificDates, setSpecificDates] = useState([]);
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const isEdit = Boolean(initialData?.id);
  const mainImageInputRef = useRef(null);
  // Prefill for Edit
  useEffect(() => {
    if (!initialData.id) return;

    setServiceName(initialData.service_name || "");
    setSlug(initialData.slug || "");
    setCategoryId(initialData.category_id || "");
    setSubcategoryId(initialData.subcategory_id || "");
    setServiceCategory(initialData.package_id || "");
    setDuration(initialData.duration || "");
    setDescription(initialData.description || "");
    setAvailability(initialData.availability || "weekly");
    setPrice(initialData.price || "");
    setLocation(initialData.location || "onsite");
    setStatus(initialData.status || 1);
    setFaq(initialData.faqs || []);
    if (initialData.main_image) setMainImagePreview(initialData.main_image);
    if (initialData.gallery)
      setGalleryPreview(initialData.gallery.map((g) => g.image));

    // Prefill weekly slots
    if (initialData.time_slots) {
      const slots = {};
      initialData.time_slots.forEach((slot) => {
        slots[slot.day] = { from: slot.time_from, to: slot.time_to };
      });
      setWeeklySlots(slots);
    }

    // Prefill specific dates
    if (initialData.specific_dates) {
      const dates = initialData.specific_dates.map((d) => ({
        date: new Date(d.specific_date),
        from: new Date(`1970-01-01T${d.time_from}`),
        to: new Date(`1970-01-01T${d.time_to}`),
      }));
      setSpecificDates(dates);
    }
  }, [initialData]);

  // Fetch categories & packages
  useEffect(() => {
    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/category",
    )
      .then((res) => res.json())
      .then((res) => setCategories(res.data || []))
      .catch(console.log);

    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/site/all-packages",
    )
      .then((res) => res.json())
      .then((res) => setPackages(res.data || []))
      .catch(console.log);
  }, []);

  // Fetch subcategories on category change
  useEffect(() => {
    if (!categoryId) return setSubcategories([]);
    fetch(
      `https://jumeirah.premierwebtechservices.com/backend/api/site/sub-categories-book/${categoryId}`,
    )
      .then((res) => res.json())
      .then((res) => setSubcategories(res.data || []))
      .catch(console.log);
  }, [categoryId]);

  // Auto-generate slug
  useEffect(() => {
    setSlug(generateSlug(serviceName));
  }, [serviceName]);

  // Weekly Slots handler
  const updateSlot = (day, field, value) => {
    setWeeklySlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  // Main image preview
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  // Gallery drag & drop
  const onDrop = (acceptedFiles) => {
    setGallery((prev) => [...prev, ...acceptedFiles]);
    setGalleryPreview((prev) => [...prev, ...acceptedFiles]);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  // Default times
  const defaultFrom = new Date();
  defaultFrom.setHours(9, 0, 0);
  const defaultTo = new Date();
  defaultTo.setHours(20, 0, 0);

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!serviceName) newErrors.serviceName = "Service Name is required";
    if (!categoryId) newErrors.categoryId = "Category is required";
    if (!duration) newErrors.duration = "Duration is required";
    if (!price) newErrors.price = "Price is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    if (isEdit) {
      formData.append("_method", "PUT"); // 🔥 key fix
    }
    formData.append("service_name", serviceName);
    formData.append("slug", slug);
    formData.append("category_id", categoryId);
    formData.append("subcategory_id", subcategoryId);
    formData.append("service_category", serviceCategory);
    formData.append("duration", duration);
    formData.append("description", description);
    formData.append("availability", availability);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("status", status);

    if (mainImage) formData.append("main_image", mainImage);
    gallery.forEach((img) => formData.append("gallery[]", img));

    // Weekly slots
    if (availability === "weekly") {
      Object.entries(weeklySlots).forEach(([day, slot]) => {
        if (slot.from && slot.to) {
          formData.append(`${day}_time_from[]`, slot.from);
          formData.append(`${day}_time_to[]`, slot.to);
        }
      });
    }

    // Specific dates
    if (availability === "specific_date") {
      specificDates.forEach((d, i) => {
        formData.append(
          `specific_available_date[${i}]`,
          d.date.toISOString().split("T")[0],
        );
        formData.append(
          `specific_available_time_from[${i}]`,
          d.from.toLocaleTimeString("en-GB", { hour12: false }).slice(0, 5),
        );
        formData.append(
          `specific_available_time_to[${i}]`,
          d.to.toLocaleTimeString("en-GB", { hour12: false }).slice(0, 5),
        );
      });
    }

    // FAQ
    faq.forEach((f, i) => {
      formData.append(`faq[${i}][question]`, f.question);
      formData.append(`faq[${i}][answer]`, f.answer);
    });
    console.log("from data", formData);
    debugger;

    onSubmit(formData);
  };

  return (
    <div className="p-6 bg-sky shadow-lg border-black-200 rounded-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        {/* <fieldset className="border border-gray-700 rounded-lg p-4 mb-6">
          <h2 className="px-3 text-xl font-bold bg-white">Basic Info</h2>
          <div>
            <label>
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.serviceName && (
              <p className="text-red-500">{errors.serviceName}</p>
            )}
          </div>
          <div>
            <label>Slug</label>
            <input
              type="text"
              value={slug}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label>
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500">{errors.categoryId}</p>
            )}
          </div>
          <div>
            <label>Subcategory</label>
            <select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Package</label>
            <select
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Package</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.duration && (
              <p className="text-red-500">{errors.duration}</p>
            )}
          </div>
          <div>
            <label>Description</label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
        </fieldset> */}
        <fieldset className="border border-gray-300 rounded-xl p-6 mb-6 bg-white dark:bg-transparent">
          <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
            Basic Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              />
              {errors.serviceName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.serviceName}
                </p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                readOnly
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        bg-gray-100 text-gray-600
        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-xs text-red-500 mt-1">{errors.categoryId}</p>
              )}
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subcategory
              </label>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Package */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Package
              </label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              >
                <option value="">Select Package</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              />
              {errors.duration && (
                <p className="text-xs text-red-500 mt-1">{errors.duration}</p>
              )}
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
        </fieldset>

        {/* <fieldset className="border border-gray-300 rounded-lg p-4 mb-6">
          {/* Media */}
        {/* <h2 className="text-xl font-bold mb-2">Media</h2>
          <div>
            <label>Main Image</label>
            <input type="file" onChange={handleMainImageChange} />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Main"
                className="w-32 h-32 mt-2 object-cover"
              />
            )}
          </div>
          <div>
            <label>Gallery</label>
            <div
              {...getRootProps()}
              className="border border-dashed p-4 cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <p>Drag & drop images here, or click to select</p>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {galleryPreview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery ${i}`}
                  className="w-24 h-24 object-cover"
                />
              ))}
            </div>
          </div>
        </fieldset> */}
        <fieldset className="border border-gray-300 rounded-xl p-6 mb-6 bg-white dark:bg-transparent">
          <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
            Media
          </h2>

          {/* Main Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Main Image
            </label>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <input
                type="file"
                ref={mainImageInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setMainImage(file); // For form submit
                  setMainImagePreview(file); // store File object
                }}
                className="block w-full sm:w-auto text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-gray-100 file:text-gray-700
          hover:file:bg-gray-200
          dark:file:bg-gray-800 dark:file:text-white"
              />

              {mainImagePreview && (
                <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => {
                      setMainImagePreview(null);
                      setMainImage(null);
                      if (mainImageInputRef.current)
                        mainImageInputRef.current.value = "";
                    }}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full
              w-6 h-6 flex items-center justify-center text-sm
              hover:bg-red-600 transition"
                  >
                    ×
                  </button>

                  <img
                    src={
                      mainImagePreview instanceof File
                        ? URL.createObjectURL(mainImagePreview) // Add mode
                        : mainImagePreview.startsWith("http")
                          ? mainImagePreview // Edit full URL
                          : `https://jumeirah.premierwebtechservices.com/backend/storage/salon_services/main/${mainImagePreview}` // Edit relative path
                    }
                    alt="Main"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gallery Images
            </label>

            <div
              {...getRootProps()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer
        hover:border-[#00CED1] transition dark:border-gray-600 dark:hover:border-[#00CED1]"
            >
              <input {...getInputProps()} />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drag & drop images here or click to upload
              </p>
            </div>

            {galleryPreview.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {galleryPreview.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full h-24 border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"
                  >
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryPreview((prev) =>
                          prev.filter((_, index) => index !== i),
                        )
                      }
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition"
                    >
                      ×
                    </button>

                    <img
                      src={
                        src instanceof File
                          ? URL.createObjectURL(src) // ✅ Add mode (ONLY here blob banega)
                          : typeof src === "string" && src.startsWith("http")
                            ? src // ✅ Edit mode full URL
                            : `https://jumeirah.premierwebtechservices.com/backend/storage/salon_services/gallery/${src}` // ✅ Edit relative
                      }
                      alt={`Gallery ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </fieldset>

        {/* <fieldset className="border border-gray-300 rounded-lg p-4 mb-6">
          {/* Pricing & Location */}
        {/* <h2 className="text-xl font-bold mb-2">Pricing & Location</h2>
          <div>
            <label>
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
          <div>
            <label>Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="onsite">Onsite</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </fieldset> */}
        <fieldset className="border border-gray-300 rounded-xl p-6 mb-6 bg-white dark:bg-transparent">
          <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
            Pricing & Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              />

              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              >
                <option value="onsite">Onsite</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-[#00CED1]
        dark:bg-transparent dark:text-white dark:border-gray-600"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* <fieldset className="border border-gray-300 rounded-lg p-4 mb-6">
          {/* Availability */}
        {/* <h2 className="text-xl font-bold mb-2">Availability</h2>
          <div>
            <label>Type</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="weekly">Weekly</option>
              <option value="specific_date">Specific Date</option>
            </select>
          </div>

          {/* Weekly Slots */}
        {/* {availability === "weekly" && (
            <div className="grid grid-cols-2 gap-3">
              {days.map((day) => (
                <div key={day}>
                  <p className="capitalize font-medium">{day}</p>
                  <input
                    type="time"
                    value={weeklySlots[day]?.from || ""}
                    onChange={(e) => updateSlot(day, "from", e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="time"
                    value={weeklySlots[day]?.to || ""}
                    onChange={(e) => updateSlot(day, "to", e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                </div>
              ))}
            </div>
          )} */}

        {/* Specific Dates */}
        {/* {availability === "specific_date" && (
            <div>
              <button
                type="button"
                onClick={() =>
                  setSpecificDates([
                    ...specificDates,
                    { date: new Date(), from: defaultFrom, to: defaultTo },
                  ])
                }
                className="mb-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                + Add Date
              </button>

              {specificDates.map((d, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 mt-2">
                  <DatePicker
                    selected={d.date}
                    onChange={(date) => {
                      const updated = [...specificDates];
                      updated[i].date = date;
                      setSpecificDates(updated);
                    }}
                    dateFormat="dd/MM/yyyy"
                  />

                  <DatePicker
                    selected={d.from}
                    onChange={(date) => {
                      const updated = [...specificDates];
                      updated[i].from = date;
                      setSpecificDates(updated);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="HH:mm"
                  />

                  <DatePicker
                    selected={d.to}
                    onChange={(date) => {
                      const updated = [...specificDates];
                      updated[i].to = date;
                      setSpecificDates(updated);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="HH:mm"
                  />
                </div>
              ))}
            </div>
          )}
        </fieldset> */}
        <fieldset className="border border-gray-300 rounded-xl p-6 mb-6 bg-white dark:bg-transparent">
          <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
            Availability
          </h2>

          {/* Type */}
          <div className="mb-6 max-w-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>

            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2
      focus:outline-none focus:ring-2 focus:ring-[#00CED1]
      dark:bg-transparent dark:text-white dark:border-gray-600"
            >
              <option value="weekly">Weekly</option>
              <option value="specific_date">Specific Date</option>
            </select>
          </div>

          {/* Weekly Slots */}
          {availability === "weekly" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {days.map((day) => (
                <div
                  key={day}
                  className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900"
                >
                  <p className="capitalize font-medium mb-2 text-gray-800 dark:text-white">
                    {day}
                  </p>

                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={weeklySlots[day]?.from || ""}
                      onChange={(e) => updateSlot(day, "from", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-2 py-1
              dark:bg-transparent dark:text-white dark:border-gray-600"
                    />

                    <span className="text-gray-500 dark:text-gray-400">to</span>

                    <input
                      type="time"
                      value={weeklySlots[day]?.to || ""}
                      onChange={(e) => updateSlot(day, "to", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-2 py-1
              dark:bg-transparent dark:text-white dark:border-gray-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Specific Dates */}
          {availability === "specific_date" && (
            <div>
              <button
                type="button"
                onClick={() =>
                  setSpecificDates([
                    ...specificDates,
                    { date: new Date(), from: defaultFrom, to: defaultTo },
                  ])
                }
                className="mb-4 bg-[#00CED1] hover:bg-[#00b7bb] text-white
        px-4 py-2 rounded-lg text-sm transition"
              >
                + Add Date
              </button>

              <div className="space-y-3">
                {specificDates.map((d, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3
            border rounded-lg p-4 bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="border-sky-400">
                      <label htmlFor={`date-${i}`} className="font-medium pr-1">
                        Date :{" "}
                      </label>
                      <DatePicker
                        selected={
                          d.date instanceof Date && !isNaN(d.date)
                            ? d.date
                            : null
                        }
                        onChange={(date) => {
                          console.log("specidic data", date);
                          const updated = [...specificDates];
                          updated[i].date = date;
                          setSpecificDates(updated);
                        }}
                        dateFormat="dd/MM/yyyy"
                        className="w-full rounded-md border border-gray-300 px-2 py-2
              dark:bg-transparent dark:text-white dark:border-gray-600"
                      />
                    </div>
                    <div className="border-sky-400">
                      <label
                        htmlFor={`time-from-${i}`}
                        className="font-medium pr-1"
                      >
                        Time from:
                      </label>
                      <DatePicker
                        selected={
                          d.from instanceof Date && !isNaN(d.from)
                            ? d.from
                            : null
                        }
                        onChange={(date) => {
                          const updated = [...specificDates];
                          updated[i].from = date;
                          setSpecificDates(updated);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        className="w-full rounded-md border border-gray-300 px-2 py-2
              dark:bg-transparent dark:text-white dark:border-gray-600"
                      />
                    </div>
                    <div className="border-sky-400">
                      <label
                        htmlFor={`time-from-${i}`}
                        className="font-medium pr-1"
                      >
                        Time To :{" "}
                      </label>
                      <DatePicker
                        selected={
                          d.to instanceof Date && !isNaN(d.to) ? d.to : null
                        }
                        onChange={(date) => {
                          const updated = [...specificDates];
                          updated[i].to = date;
                          setSpecificDates(updated);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        className="w-full rounded-md border border-gray-300 px-2 py-2
              dark:bg-transparent dark:text-white dark:border-gray-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </fieldset>

        {/* <fieldset className="border border-gray-300 rounded-lg p-4 mb-6"> */}
        {/* FAQ */}
        {/* <h2 className="text-xl font-bold mb-2">FAQ</h2>
          {faq.map((f, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 mb-2">
              <label>Question</label>
              <input
                type="text"
                placeholder="Enter question"
                value={f.question}
                onChange={(e) => {
                  const x = [...faq];
                  x[i].question = e.target.value;
                  setFaq(x);
                }}
                className="w-full border rounded px-3 py-2"
              />
              <label>Answer</label>
              <textarea
                placeholder="Enter answer"
                value={f.answer}
                onChange={(e) => {
                  const x = [...faq];
                  x[i].answer = e.target.value;
                  setFaq(x);
                }}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFaq([...faq, { question: "", answer: "" }])}
            className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
          >
            + Add FAQ
          </button>

        </fieldset> */}
        <fieldset className="border border-gray-300 rounded-xl p-6 mb-6 bg-white dark:bg-transparent">
          <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
            FAQ
          </h2>

          <div className="space-y-4">
            {faq.map((f, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900"
              >
                <div className="grid grid-cols-1 gap-4">
                  {/* Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      placeholder="Enter question"
                      value={f.question}
                      onChange={(e) => {
                        const x = [...faq];
                        x[i].question = e.target.value;
                        setFaq(x);
                      }}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#00CED1]
              dark:bg-transparent dark:text-white dark:border-gray-600"
                    />
                  </div>

                  {/* Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Answer
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter answer"
                      value={f.answer}
                      onChange={(e) => {
                        const x = [...faq];
                        x[i].answer = e.target.value;
                        setFaq(x);
                      }}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#00CED1]
              dark:bg-transparent dark:text-white dark:border-gray-600 resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setFaq([...faq, { question: "", answer: "" }])}
            className="mt-5 inline-flex items-center gap-2
    bg-[#00CED1] hover:bg-[#00b7bb] text-white
    px-4 py-2 rounded-lg text-sm transition"
          >
            + Add FAQ
          </button>
        </fieldset>

        <button
          type="submit"
          className="bg-[#00CED1] text-white px-5 py-2 rounded"
        >
          Save Service
        </button>
      </form>
    </div>
  );
}
