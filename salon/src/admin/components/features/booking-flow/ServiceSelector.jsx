const services = [
  { name: "Haircut", price: 300 },
  { name: "Massage", price: 700 },
  { name: "Facial", price: 500 },
  { name: "Manicure", price: 350 },
];

const ServiceSelector = ({ selectedService, setSelectedService }) => {
  return (
    <div className="bg-white p-4 shadow rounded-xl mb-4">
      <h2 className="text-xl font-bold mb-2">Select Service</h2>

      <div className="grid grid-cols-2 gap-3">
        {services.map((s) => (
          <button
            key={s.name}
            onClick={() => setSelectedService(s)}
            className={`
              p-3 rounded-lg border 
              ${
                selectedService?.name === s.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }
            `}
          >
            {s.name} — ₹{s.price}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
