import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function BookingPage() {
  const { id } = useParams(); // booking id from URL for editing
  const navigate = useNavigate();

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

  const [step, setStep] = useState("calendar");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  const isEdit = Boolean(id);

  // Convert 24-hour "HH:MM:SS" to 12-hour AM/PM
  const to12HourFormat = (time24) => {
    if (!time24) return "";
    const [hourStr, minuteStr] = time24.split(":");
    let hours = parseInt(hourStr);
    const minutes = minuteStr;
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 === 0 ? 12 : hours % 12;
    return `${hours.toString().padStart(2, "0")}:${minutes} ${suffix}`;
  };

  // Fetch booking data if editing
  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/booking/${id}`);
        const result = await res.json();

        if (!result.success) throw new Error("Booking not found");

        const booking = result.data;

        // 1️⃣ Set basic fields first
        setFormData((p) => ({
          ...p,
          date: new Date(booking.date),
          time: `${to12HourFormat(booking.time_from)} - ${to12HourFormat(
            booking.time_to
          )}`,
          name: booking.name,
          phone: booking.phone,
          email: booking.email,
          category_id: booking.category_id,
          sub_category_id: booking.subcategory_id,
        }));

        // 2️⃣ Fetch services first
        const serviceRes = await fetch(
          `http://localhost:8000/api/site/all-services/${booking.subcategory_id}`
        );
        const serviceData = await serviceRes.json();
        setServices(serviceData.data ?? serviceData);

        // 3️⃣ Now safely set service_id
        setFormData((p) => ({
          ...p,
          service_id: booking.service_id,
        }));

        setStep("form");
      } catch (err) {
        alert("Failed to fetch booking");
        navigate("/admin/bookings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8000/api/site/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.data ?? data));
  }, []);

  // Fetch subcategories
  useEffect(() => {
    if (!formData.category_id) return;

    fetch(
      `http://localhost:8000/api/site/sub-categories/${formData.category_id}`
    )
      .then((res) => res.json())
      .then((data) => setSubCategories(data.data ?? data));

    setFormData((p) => ({ ...p, sub_category_id: "", service_id: "" }));
    setServices([]);
  }, [formData.category_id]);

  // Fetch services
  useEffect(() => {
    if (!formData.sub_category_id) return;

    console.log(formData.sub_category_id);
    debugger;
    fetch(
      `http://localhost:8000/api/site/all-services/${formData.sub_category_id}`
    )
      .then((res) => res.json())
      .then((data) => setServices(data.data ?? data));

    setFormData((p) => ({ ...p, service_id: "" }));
  }, [formData.sub_category_id]);

  const selectedCategory = categories.find((c) => c.id == formData.category_id);
  const selectedSubCategory = subCategories.find(
    (s) => s.id == formData.sub_category_id
  );
  const selectedService = services.find((s) => s.id == formData.service_id);

  const convertToSqlTime = (t) => {
    if (!t) return "";
    const [time, modifier] = t.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
  };

  const confirmBooking = async () => {
    const [fromRaw, toRaw] = formData.time.split(" - ");
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
      category_id: formData.category_id,
      sub_category_id: formData.sub_category_id,
      service_id: formData.service_id,
      category_name: selectedCategory?.name ?? "",
      sub_category_name: selectedSubCategory?.name ?? "",
      service_name: selectedService?.name ?? "",
    };
    console.log("Booking payload:", payload);
    debugger;

    try {
      const url = isEdit
        ? `http://localhost:8000/api/booking/update/${id}`
        : "http://localhost:8000/api/booking/create";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setBookingResponse(data.data);
        setShowSuccessModal(true);
      } else {
        alert("Booking failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
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
    navigate(isEdit ? "/admin/bookings" : "/admin/bookings");
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500">Loading booking...</div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isEdit ? "Edit Booking" : "Book Your Service"}
      </h1>

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
              setSelectedDate={(d) => {
                setFormData((p) => ({ ...p, date: d }));
                setStep("times");
              }}
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
              setSelectedTime={(t) => {
                setFormData((p) => ({ ...p, time: t }));
                setStep("form");
              }}
              onBack={() => setStep("calendar")}
              onNext={() => setStep("form")}
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
              onSubmit={(d) => {
                setFormData((p) => ({ ...p, ...d }));
                setStep("preview");
              }}
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
}
