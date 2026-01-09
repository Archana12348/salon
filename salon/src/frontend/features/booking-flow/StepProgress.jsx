import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, FileEdit, Eye } from "lucide-react";

const StepProgress = ({ step }) => {
  const steps = ["calendar", "times", "form", "preview"];
  const currentIndex = steps.indexOf(step);

  const label = {
    calendar: "Calendar",
    times: "Time",
    form: "Form",
    preview: "Preview",
  };

  const icons = {
    calendar: <CalendarCheck size={20} />,
    times: <Clock size={20} />,
    form: <FileEdit size={20} />,
    preview: <Eye size={20} />,
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      {/* Background line */}
      <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full" />

      {/* Progress line */}
      <motion.div
        className="absolute top-5 left-0 h-1 bg-blue-600 rounded-full pl-1"
        initial={{ width: 0 }}
        animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Steps */}
      <div className="relative z-10 flex justify-between">
        {steps.map((s, i) => {
          const isActive = i === currentIndex;
          const isCompleted = i < currentIndex;

          return (
            <div key={s} className="flex flex-col items-center">
              <motion.div
                animate={{ scale: isActive ? 1.06 : 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow
                ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {icons[s]}
              </motion.div>
              <span className="text-xs mt-2">{label[s]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
