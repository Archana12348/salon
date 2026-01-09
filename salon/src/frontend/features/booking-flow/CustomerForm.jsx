import React from "react";

const CustomerForm = ({ formData, setFormData, onSubmit, onBack }) => {
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
      className="bg-white p-6 shadow-xl rounded-2xl mt-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Enter Customer Details
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          value={formData.name}
          onChange={handleChange}
          name="name"
          type="text"
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
          required
          className="w-full p-3 border rounded-xl"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Service</label>
        <select
          value={formData.service}
          onChange={handleChange}
          name="service"
          required
          className="w-full p-3 border rounded-xl"
        >
          <option value="">Choose a Service</option>
          <option value="Hair Cut">Hair Cut</option>
          <option value="Hair Spa">Hair Spa</option>
          <option value="Facial">Facial</option>
          <option value="Manicure">Manicure</option>
          <option value="Pedicure">Pedicure</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 py-3 rounded-xl"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
