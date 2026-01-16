import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CustomCalendar({
  selectedDate,
  setSelectedDate,
  minDate,
}) {
  // default minDate = today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const effectiveMinDate = minDate ? new Date(minDate) : today;

  // Always keep the month state separate
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1)
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
  const isToday = (dateObj) => dateObj.toDateString() === today.toDateString();

  // Check selected date
  const isSelected = (dateObj) =>
    selectedDate && dateObj.toDateString() === selectedDate.toDateString();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-3xl  border border-gray-200 shadow-[0_25px_50px_rgba(0,206,209,0.4)] hover:shadow-[0_35px_60px_rgba(0,206,209,0.5)] transition-shadow">
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

          const disabled = dateObj < effectiveMinDate;

          return (
            <button
              key={day}
              onClick={() => !disabled && setSelectedDate(dateObj)}
              className={`
                h-9 w-9  md:h-12 md:w-12 mx-auto flex items-center justify-center rounded-xl
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
