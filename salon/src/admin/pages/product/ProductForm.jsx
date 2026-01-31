import React, { useEffect, useState } from "react";
import RichTextEditor from "../../components/common/RichTextEditor";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const BASE_URL = "https://jumeirah.premierwebtechservices.com/backend/";

const generateSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CED1]";

export default function ProductForm({ initialData = {}, onSubmit }) {
  const isEdit = Boolean(initialData?.id);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [status, setStatus] = useState(1);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const [gallery, setGallery] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetch(`${BASE_URL}api/admin/categories`)
      .then((res) => res.json())
      .then((res) => setCategories(res.data || []));
  }, []);

  /* ================= PREFILL EDIT ================= */
  useEffect(() => {
    if (!initialData?.id) return;

    setName(initialData.name || "");
    setSlug(initialData.slug || "");
    setSku(initialData.sku || "");
    setRegularPrice(initialData.regular_price || "");
    setSellingPrice(initialData.selling_price || "");
    setDiscountPrice(initialData.discount_price || "");
    setDescription(initialData.description || "");

    setSelectedCategories(
      (initialData.categories || []).map((c) => String(c.id)),
    );

    setStatus(initialData.status ? 1 : 0);
    setIsFeatured(Boolean(initialData.is_featured));
    setIsNew(Boolean(initialData.is_new));

    if (initialData.main_image) {
      setMainImagePreview(BASE_URL + initialData.main_image);
    }

    if (initialData.gallery?.length) {
      setGalleryPreview(initialData.gallery.map((img) => BASE_URL + img));
    }
  }, [initialData]);

  /* ================= SLUG AUTO ================= */
  useEffect(() => {
    setSlug(generateSlug(name));
  }, [name]);

  /* ================= DROPZONE ================= */
  const onDrop = (files) => {
    setGallery((prev) => [...prev, ...files]);
    setGalleryPreview((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop,
  });

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !sku ||
      !regularPrice ||
      !sellingPrice ||
      selectedCategories.length === 0
    ) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    if (isEdit) formData.append("_method", "PUT");

    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("sku", sku);
    formData.append("regular_price", regularPrice);
    formData.append("selling_price", sellingPrice);
    formData.append("discount_price", discountPrice);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("is_featured", isFeatured ? 1 : 0);
    formData.append("is_new", isNew ? 1 : 0);

    selectedCategories.forEach((id) => formData.append("categories[]", id));

    if (mainImage) {
      formData.append("main_image", mainImage);
    }

    gallery.forEach((img) => {
      formData.append("gallery[]", img);
    });

    const url = isEdit
      ? `${BASE_URL}api/admin/products/${initialData.id}`
      : `${BASE_URL}api/admin/products`;

    await axios.post(url, formData);
    alert("Product saved successfully ✅");
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* BASIC INFO */}
        <section className="bg-gray-50 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Product Information</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <input
              placeholder="Slug"
              value={slug}
              readOnly
              className={`${inputClass} bg-gray-100`}
            />
            <input
              placeholder="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className={inputClass}
            />
          </div>

          <RichTextEditor value={description} onChange={setDescription} />
        </section>

        {/* CATEGORY */}
        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Categories *</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4 bg-white">
            {categories.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={c.id}
                  checked={selectedCategories.includes(String(c.id))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([
                        ...selectedCategories,
                        String(c.id),
                      ]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((id) => id !== String(c.id)),
                      );
                    }
                  }}
                />
                <span>{c.name}</span>
              </label>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-gray-50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Heading */}
          <h2 className="text-xl font-semibold mb-2 col-span-full">Price *</h2>

          <input
            type="number"
            placeholder="Regular Price"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
            className={inputClass}
          />

          <input
            type="number"
            placeholder="Selling Price"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className={inputClass}
          />

          <input
            type="number"
            placeholder="Discount Price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className={inputClass}
          />
        </section>

        {/* MEDIA */}
        <section className="bg-gray-50 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold mb-2 col-span-full">
            Main Image *
          </h2>
          <input
            type="file"
            onChange={(e) => {
              setMainImage(e.target.files[0]);
              setMainImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {mainImagePreview && (
            <img
              src={mainImagePreview}
              className="w-32 h-32 object-cover rounded"
            />
          )}
          <h2 className="text-xl font-semibold mb-2 col-span-full mt-4">
            Multiple Image *
          </h2>
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            Drag & drop gallery images
          </div>

          <div className="flex gap-3 flex-wrap">
            {galleryPreview.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </section>

        {/* STATUS */}
        <section className="bg-gray-50 p-6 rounded-xl space-y-4">
          {/* Heading */}
          <h2 className="text-xl font-semibold">Status *</h2>

          {/* Controls */}
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
              />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isNew}
                onChange={() => setIsNew(!isNew)}
              />
              New
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className={`${inputClass} w-40`}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </section>

        {/* SAVE */}
        <div className="text-right">
          <button
            type="submit"
            className="px-10 py-3 bg-[#00CED1] rounded-full font-semibold hover:bg-black hover:text-white"
          >
            {isEdit ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
