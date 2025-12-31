import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CustomCalendar({ selectedDate, setSelectedDate }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Always keep the month state separate
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Move between months
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Total days in month
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  // Starting position of first day
  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Check today
  const isToday = (dateObj) => {
    return dateObj.toDateString() === today.toDateString();
  };

  // Check selected date
  const isSelected = (dateObj) => {
    return (
      selectedDate && dateObj.toDateString() === selectedDate.toDateString()
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-2xl font-bold">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>

        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Days bar */}
      <div className="grid grid-cols-7 text-center text-gray-600 font-semibold mb-3">
        {days.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Empty spaces */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={i}></div>
        ))}

        {/* Actual Days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;

          const dateObj = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );

          const disabled = dateObj < today;

          return (
            <button
              key={day}
              onClick={() => !disabled && setSelectedDate(dateObj)}
              className={`
                h-12 w-12 mx-auto flex items-center justify-center rounded-xl
                border transition-all select-none

                ${
                  disabled
                    ? "text-gray-300 cursor-not-allowed border-gray-100"
                    : "hover:bg-indigo-100 cursor-pointer border-gray-300"
                }

                ${isToday(dateObj) ? "border-indigo-500 font-bold" : ""}

                ${
                  isSelected(dateObj)
                    ? "bg-indigo-600 text-white shadow-lg border-indigo-600"
                    : ""
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
