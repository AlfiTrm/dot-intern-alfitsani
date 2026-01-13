import React from "react";
import { Clock } from "lucide-react";

export default function QuizTimer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLow = timeLeft <= 60;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
        isLow ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
      }`}
    >
      <Clock className="w-4 h-4" />
      <span className="font-mono font-medium">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
