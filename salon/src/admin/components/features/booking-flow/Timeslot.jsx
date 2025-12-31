import React, { useState, useEffect } from "react";

const TimeSlot = ({ selectedDate, selectedTime, setSelectedTime, onBack }) => {
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

  useEffect(() => {
    if (!selectedDate) return;

    const day = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday

    let generated = [];

    if (day >= 1 && day <= 5) {
      // Mon–Fri
      generated = generateRangeSlots(10, 20, 2); // 10 AM - 8 PM (2hr slots)
    } else {
      // Sat–Sun
      generated = generateRangeSlots(10, 19, 2); // 10 AM - 7 PM (2hr slots)
    }

    setSlots(generated);
    setTakenSlots([]);
  }, [selectedDate]);

  if (!selectedDate) return null;

  const handleSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="bg-white p-5 shadow-lg rounded-2xl mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">Select Time</h2>

      {/* ⭐⭐⭐ THREE COLUMN GRID ⭐⭐⭐ */}
      <div className="grid grid-cols-3 gap-3">
        {slots.map((time) => {
          const isTaken = takenSlots.includes(time);

          return (
            <button
              key={time}
              disabled={isTaken}
              onClick={() => handleSelect(time)}
              className={`p-3 rounded-lg border text-sm transition
                ${
                  isTaken
                    ? "bg-red-200 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-blue-600 hover:text-white"
                }
                ${
                  selectedTime === time
                    ? "bg-blue-600 text-white shadow-md"
                    : ""
                }
              `}
            >
              {isTaken ? `${time} (Taken)` : time}
            </button>
          );
        })}
      </div>
      <div className="flex gap-3 mt-5">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 py-3 rounded-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TimeSlot;
