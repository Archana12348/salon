import React from "react";

const CustomerForm = ({
  formData,
  setFormData,
  categories,
  subCategories,
  services,
  onSubmit,
  onBack,
}) => {
  console.log("CustomerForm Rendered", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6  rounded-2xl mt-6 shadow-[0_25px_50px_rgba(0,206,209,0.4)] hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow"
    >
      <h2
        className="text-2xl font-semibold mb-4 text-center"
        style={{ fontFamily: "var(--font-heading--family)" }}
      >
        Enter Customer Details
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Full Name <span className="text-red-700 font-semibold">*</span>
        </label>
        <input
          value={formData.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Enter your name "
          required
          className="w-full p-3 border rounded-xl"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          type="tel"
          required
          maxLength={10}
          pattern="[0-9]{10}"
          inputMode="numeric"
          placeholder="Enter 10 digit number"
          className="w-full p-3 border rounded-xl"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Enter your valid email"
          required
          className="w-full p-3 border rounded-xl"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Select Categories{" "}
          <span className="text-red-700 font-semibold">*</span>
        </label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-xl"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Select Sub Categories{" "}
          <span className="text-red-700 font-semibold">*</span>
        </label>
        <select
          name="sub_category_id"
          value={formData.sub_category_id}
          disabled={!formData.category_id}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-xl"
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((s) => (
            <option key={s.id} value={s.id} data-name>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Select Services <span className="text-red-700 font-semibold">*</span>
        </label>
        <select
          name="service_id"
          value={formData.service_id}
          disabled={!formData.sub_category_id}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-xl"
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 py-2 sm:py-3 rounded-xl"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-[#00CED1] to-slate-500 text-white shadow-[0_0_15px_rgba(0,206,209,0.6) py-2 sm:py-3 rounded-xl"
        >
          Preview Booking
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
