import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "./StepProgress";
import Calendar from "./Calendar";
import TimeSlot from "./Timeslot";
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
    category_id: "",
    sub_category_id: "",
    service_id: "",
  });

  const [step, setStep] = useState("calendar"); // calendar | times | form | preview
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [bookingResponse, setBookingResponse] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    fetch("http://localhost:8000/api/site/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.data ?? data));
  }, []);
  useEffect(() => {
    if (!formData.category_id) return;

    fetch(
      `http://localhost:8000/api/site/sub-categories/${formData.category_id}`
    )
      .then((res) => res.json())
      .then((data) => setSubCategories(data.data ?? data));

    // reset lower values
    setFormData((p) => ({
      ...p,
      sub_category_id: "",
      service_id: "",
    }));
    setServices([]);
  }, [formData.category_id]);
  useEffect(() => {
    if (!formData.sub_category_id) return;

    fetch(
      `http://localhost:8000/api/site/all-services/${formData.sub_category_id}`
    )
      .then((res) => res.json())
      .then((data) => setServices(data.data ?? data));

    setFormData((p) => ({
      ...p,
      service_id: "",
    }));
  }, [formData.sub_category_id]);

  const selectedCategory = categories.find((c) => c.id == formData.category_id);

  const selectedSubCategory = subCategories.find(
    (s) => s.id == formData.sub_category_id
  );

  const selectedService = services.find((s) => s.id == formData.service_id);
  const confirmBooking = async () => {
    const [fromRaw, toRaw] = formData.time.split(" - ");

    // convert to 24h format
    const time_from = convertToSqlTime(fromRaw);
    const time_to = convertToSqlTime(toRaw);

    const payload = {
      date: formData.date.toISOString().split("T")[0],
      time_from,
      time_to,
      user_id: 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      // IDs (for DB)
      category_id: formData.category_id,
      sub_category_id: formData.sub_category_id,
      service_id: formData.service_id,

      // Names (for display / notifications)
      category_name: selectedCategory?.name ?? "",
      sub_category_name: selectedSubCategory?.name ?? "",
      service_name: selectedService?.name ?? "",
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
        setBookingResponse(data.data);
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
      category_id: "",
      sub_category_id: "",
      service_id: "",
    });
    setCategories([]);
    setSubCategories([]);
    setServices([]);
    console.log(
      "dd",
      location.pathname.startsWith("/admin"),
      location.pathname
    );
    // 👉 if admin URL, navigate
    if (location.pathname.startsWith("/admin")) {
      navigate("/admin/bookings");
    } else {
      navigate("/");
    }
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
              categories={categories}
              subCategories={subCategories}
              services={services}
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
              categories={selectedCategory}
              subCategories={selectedSubCategory}
              services={selectedService}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SuccessModal
        open={showSuccessModal}
        setOpen={closeSuccessModal}
        booking={bookingResponse}
      />
    </div>
  );
};

export default BookingPage;
