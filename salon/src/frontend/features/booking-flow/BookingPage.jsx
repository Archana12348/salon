import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "./StepProgress";
import Calendar from "./Calendar";
import TimeSlot from "./TimeSlot";
import CustomerForm from "./CustomerForm";
import CustomerPreview from "./CustomerPreview";
import SuccessModal from "./SuccessModal";

const slideVariants = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
  exitLeft: { opacity: 0, x: -80 },
  exitRight: { opacity: 0, x: 80 },
};

const BookingPage = () => {
  const [formData, setFormData] = useState({
    date: null,
    time: "",
    name: "",
    phone: "",
    email: "",
    service: "",
  });

  const [step, setStep] = useState("calendar"); // calendar | times | form | preview
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // step handlers
  const handleDateSelect = (date) => {
    setFormData((p) => ({ ...p, date }));
    setStep("times");
  };

  const handleTimeSelect = (time) => {
    setFormData((p) => ({ ...p, time }));
    setStep("form");
  };

  const handleCustomerSubmit = (customerDetails) => {
    // customerDetails can be the same formData or a partial object
    setFormData((p) => ({ ...p, ...customerDetails }));
    setStep("preview");
  };

  const convertToSqlTime = (t) => {
    const [time, modifier] = t.split(" ");
    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
  };

  const confirmBooking = async () => {
    const [fromRaw, toRaw] = formData.time.split(" - ");

    // convert to 24h format
    const time_from = convertToSqlTime(fromRaw);
    const time_to = convertToSqlTime(toRaw);

    const payload = {
      service_id: formData.service_id ?? 1,
      date: formData.date.toISOString().split("T")[0],
      time_from,
      time_to,
      user_id: 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    };
    console.log("Booking Payload:", payload);
    debugger;

    try {
      const res = await fetch("http://localhost:8000/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
      } else {
        alert("Booking failed.");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    // reset
    setFormData({
      date: null,
      time: "",
      name: "",
      phone: "",
      email: "",
      service: "",
    });
    setStep("calendar");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Service</h1>

      <StepProgress step={step} />

      <AnimatePresence mode="wait">
        {step === "calendar" && (
          <motion.div
            key="calendar"
            variants={slideVariants}
            initial="hiddenLeft"
            animate="visible"
            exit="exitRight"
            transition={{ duration: 0.35 }}
          >
            <Calendar
              selectedDate={formData.date}
              setSelectedDate={handleDateSelect}
            />
          </motion.div>
        )}

        {step === "times" && (
          <motion.div
            key="times"
            variants={slideVariants}
            initial="hiddenRight"
            animate="visible"
            exit="exitLeft"
            transition={{ duration: 0.35 }}
          >
            <TimeSlot
              selectedDate={formData.date}
              selectedTime={formData.time}
              setSelectedTime={handleTimeSelect}
              onBack={() => setStep("calendar")}
            />
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            variants={slideVariants}
            initial="hiddenRight"
            animate="visible"
            exit="exitLeft"
            transition={{ duration: 0.35 }}
          >
            <CustomerForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleCustomerSubmit}
              onBack={() => setStep("times")}
            />
          </motion.div>
        )}

        {step === "preview" && (
          <motion.div
            key="preview"
            variants={slideVariants}
            initial="hiddenRight"
            animate="visible"
            exit="exitLeft"
            transition={{ duration: 0.35 }}
          >
            <CustomerPreview
              data={formData}
              onBack={() => setStep("form")}
              onConfirm={confirmBooking}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SuccessModal
        open={showSuccessModal}
        setOpen={closeSuccessModal}
        booking={{
          date: formData.date?.toDateString(),
          time: formData.time,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
        }}
      />
    </div>
  );
};

export default BookingPage;
