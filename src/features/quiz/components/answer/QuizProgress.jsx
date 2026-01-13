import React from "react";

export default function QuizProgress({ current, total, percentage }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Progress</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
