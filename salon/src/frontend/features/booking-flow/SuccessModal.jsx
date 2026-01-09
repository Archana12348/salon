const SuccessModal = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
        <h2 className="text-xl font-bold mb-3">🎉 Booking Successful!</h2>
        <p>Your booking has been confirmed.</p>

        <button
          onClick={setOpen} // ← FIXED
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
