import React, { useState, useEffect } from "react";

const TimeSlot = ({
  selectedDate,
  selectedTime,
  setSelectedTime,
  onBack,
  onNext,
}) => {
  const [takenSlots, setTakenSlots] = useState([]);
  const [slots, setSlots] = useState([]);

  // Generate time RANGE slots like "10:00 AM - 12:00 PM"
  const generateRangeSlots = (startHour, endHour, duration = 2) => {
    const result = [];
    for (let hour = startHour; hour < endHour; hour += duration) {
      const start = formatTime(hour);
      const end = formatTime(hour + duration);
      result.push(`${start} - ${end}`);
    }
    return result;
  };

  // Convert 24-hour to AM/PM format
  const formatTime = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour.toString().padStart(2, "0")}:00 ${suffix}`;
  };

  // Check if slot is in the past
  const isPastSlot = (time) => {
    if (!selectedDate) return false;

    const [fromRaw] = time.split(" - ");
    let [hours, minutes] = fromRaw.split(":");
    const modifier = fromRaw.includes("PM") ? "PM" : "AM";
    hours = parseInt(hours);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(hours, parseInt(minutes), 0, 0);

    return slotDateTime < new Date();
  };

  // Generate slots based on day
  useEffect(() => {
    if (!selectedDate) return;

    const day = selectedDate.getDay(); // 0 = Sun, 6 = Sat
    let generated = [];

    if (day >= 1 && day <= 5) {
      // Mon–Fri
      generated = generateRangeSlots(10, 20, 2); // 10 AM - 8 PM
    } else {
      // Sat–Sun
      generated = generateRangeSlots(10, 19, 2); // 10 AM - 7 PM
    }

    setSlots(generated);

    // Reset taken slots (or fetch from API)
    setTakenSlots([]);
  }, [selectedDate]);

  if (!selectedDate) return null;

  return (
    <div className="bg-white p-4 sm:p-5 shadow-lg rounded-2xl mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">Select Time</h2>

      {/* Grid of slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {slots.map((time) => {
          const isTaken = takenSlots.includes(time) || isPastSlot(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              disabled={isTaken}
              onClick={() => setSelectedTime(time)}
              className={`relative p-2 sm:p-3 rounded-lg border 
text-xs sm:text-sm transition
        ${
          isTaken
            ? "bg-red-200 cursor-not-allowed"
            : "bg-gray-100 hover:bg-[#00CED1] hover:text-white"
        }
        ${isSelected && !isTaken ? "text-white shadow-md" : ""}
      `}
            >
              {/* Glow effect */}
              {isSelected && !isTaken && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#00CED1] via-sky-400 to-gray-500 opacity-80 blur-md rounded-lg z-0"></span>
              )}

              {/* Button text on top */}
              <span className="relative z-10">
                {isTaken ? `${time} (Unavailable)` : time}
              </span>
            </button>
          );
        })}
      </div>

      {/* Back button */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 py-2 sm:py-3 rounded-xl"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-[#00CED1] to-slate-500 text-white shadow-[0_0_15px_rgba(0,206,209,0.6) py-2 sm:py-3 rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TimeSlot;
