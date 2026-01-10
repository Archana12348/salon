import React, { useState } from "react";
import Calendar from "./Calendar";
import TimeSlot from "./TimeSlot";
import CustomerForm from "./CustomerForm";
import SuccessModal from "./SuccessModal";
import CustomerPreview from "./CustomerPreview";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [preview, setPreview] = useState({});
  const [step, setStep] = useState("calendar");
  const [showModal, setShowModal] = useState(false);

  // Go to next step after form
  const handleCustomerSubmit = () => {
    setStep("preview");
  };

  // Confirm booking → show success modal
  // const confirmBooking = () => {
  //   console.log("hello");
  //   debugger;
  //   setStep("success"); // preview hidden
  //   setShowModal(true);
  // };

  const confirmBooking = () => {
    setStep("none"); // hides preview
    setShowModal(true); // shows success modal
  };

  // Success modal close → reset all
  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
    setSelectedTime("");
    setPreview({});
    setStep("calendar");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Service</h1>

      {step === "calendar" && (
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={(d) => {
            setSelectedDate(d);
            setStep("times");
          }}
        />
      )}

      {step === "times" && (
        <TimeSlot
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={(t) => {
            setSelectedTime(t);
            setStep("form");
          }}
        />
      )}

      {step === "form" && (
        <CustomerForm onSubmit={handleCustomerSubmit} setPreview={setPreview} />
      )}

      {/* 🔥 Preview Modal */}
      {step === "preview" && (
        <CustomerPreview
          data={{
            date: selectedDate,
            time: selectedTime,
            ...preview,
          }}
          onConfirm={confirmBooking}
          onBack={() => setStep("form")}
        />
      )}

      {/* SUCCESS MODAL */}
      <SuccessModal
        open={showModal}
        setOpen={closeModal}
        booking={{
          date: selectedDate?.toDateString(),
          time: selectedTime,
          name: preview?.name,
          phone: preview?.phone,
          email: preview?.email,
          service: preview?.service,
        }}
      />
    </div>
  );
};

export default BookingPage;
